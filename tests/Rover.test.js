import { describe, it, expect, vi } from 'vitest';

// Mock THREE to avoid WebGL / browser dependencies in Node
vi.mock('three', () => {
    return {
        Group: class {
            constructor() {
                this.add = vi.fn();
            }
        },
        BoxGeometry: class {},
        ConeGeometry: class {},
        MeshPhongMaterial: class {},
        Mesh: class {
            constructor() {
                this.position = { x: 0, y: 0, z: 0, set: vi.fn(), copy: vi.fn(), lerpVectors: vi.fn() };
                this.rotation = { x: 0, y: 0, z: 0, set: vi.fn() };
            }
        },
        Vector3: class {
            constructor() {
                this.x = 0;
                this.y = 0;
                this.z = 0;
            }
            copy(v) {
                this.x = v.x;
                this.y = v.y;
                this.z = v.z;
            }
        }
    };
});

import { Rover } from '../src/roberto/Rover.js';

describe('Rover Navigation', () => {
    it('updateDirection(turn) correctly changes direction', () => {
        const rover = new Rover();
        
        // Initial state
        expect(rover.direction).toBe('N');
        
        // Full 360 turn right
        rover.updateDirection('RIGHT');
        expect(rover.direction).toBe('E');
        rover.updateDirection('RIGHT');
        expect(rover.direction).toBe('S');
        rover.updateDirection('RIGHT');
        expect(rover.direction).toBe('W');
        rover.updateDirection('RIGHT');
        expect(rover.direction).toBe('N');

        // Full 360 turn left
        rover.updateDirection('LEFT');
        expect(rover.direction).toBe('W');
        rover.updateDirection('LEFT');
        expect(rover.direction).toBe('S');
        rover.updateDirection('LEFT');
        expect(rover.direction).toBe('E');
        rover.updateDirection('LEFT');
        expect(rover.direction).toBe('N');
    });

    it('worldToGrid(wx, wz) converts coordinates correctly', () => {
        const rover = new Rover();
        // Mock a 5x5 map
        rover.currentMapData = [
            [1, 1, 1, 1, 1],
            [1, 0, 0, 2, 1],
            [1, 0, 1, 0, 1],
            [1, 3, 0, 0, 1],
            [1, 1, 1, 1, 1]
        ];

        // Center of 5x5 map: offsets are -5/2 + 0.5 = -2 for X and Z
        // Inverting the offset calculation from Rover.js: gridX = Math.round(wx - (-2)) = Math.round(wx + 2)
        
        // Let's test the center of the grid (gridX: 2, gridZ: 2) -> wx = 0, wz = 0
        let coords = rover.worldToGrid(0, 0);
        expect(coords).toEqual({ gridX: 2, gridZ: 2 });
        
        // Test grid (0, 0) -> wx = -2, wz = -2
        coords = rover.worldToGrid(-2, -2);
        expect(coords).toEqual({ gridX: 0, gridZ: 0 });

        // Test grid (4, 4) -> wx = 2, wz = 2
        coords = rover.worldToGrid(2, 2);
        expect(coords).toEqual({ gridX: 4, gridZ: 4 });
    });

    it('isValidMove(x, z) validates moves against map data', () => {
        const rover = new Rover();
        rover.currentMapData = [
            [1, 1, 1],
            [1, 0, 1],
            [1, 1, 1]
        ];

        // Valid move onto floor (grid 1,1 -> world 0,0)
        expect(rover.isValidMove(0, 0)).toBe(true);

        // Invalid move onto wall (grid 0,0 -> world -1,-1)
        expect(rover.isValidMove(-1, -1)).toBe(false);
        expect(rover.isValidMove(1, 1)).toBe(false);

        // Out of bounds
        expect(rover.isValidMove(2, 2)).toBe(false);
        expect(rover.isValidMove(-2, -2)).toBe(false);
    });
});
