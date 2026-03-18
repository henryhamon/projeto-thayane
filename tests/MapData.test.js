import { describe, it, expect } from 'vitest';
import { MazeGenerator, TILE_TYPES } from '../src/pico-parana/MapData.js';

describe('MazeGenerator', () => {
    it('generates a map of correct size (15x15)', () => {
        const width = 15;
        const height = 15;
        const map = MazeGenerator.generate(width, height);

        expect(map.length).toBe(height);
        expect(map[0].length).toBe(width);
    });

    it('contains exactly one CUME and one FAZENDA', () => {
        const map = MazeGenerator.generate(15, 15);
        let cumeCount = 0;
        let fazendaCount = 0;

        for (let row of map) {
            for (let tile of row) {
                if (tile === TILE_TYPES.CUME) cumeCount++;
                if (tile === TILE_TYPES.FAZENDA) fazendaCount++;
            }
        }

        expect(cumeCount).toBe(1);
        expect(fazendaCount).toBe(1);
    });

    it('has boundaries formed entirely by PEDRA', () => {
        const width = 15;
        const height = 15;
        const map = MazeGenerator.generate(width, height);

        // Check top and bottom rows
        for (let x = 0; x < width; x++) {
            expect(map[0][x]).toBe(TILE_TYPES.PEDRA);
            expect(map[height - 1][x]).toBe(TILE_TYPES.PEDRA);
        }

        // Check left and right columns
        for (let y = 0; y < height; y++) {
            expect(map[y][0]).toBe(TILE_TYPES.PEDRA);
            expect(map[y][width - 1]).toBe(TILE_TYPES.PEDRA);
        }
    });
});
