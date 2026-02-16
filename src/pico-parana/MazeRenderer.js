import * as THREE from 'three';
import { assetManager } from '../system/AssetManager.js';
import { TILE_TYPES } from './MapData.js';

export class MazeRenderer {
  constructor() {
    this.group = new THREE.Group();
    this.groundGrid = []; // Stores references to ground meshes

    // Materials
    this.materials = {
      ground: new THREE.MeshLambertMaterial({ color: 0x8b5a2b }), // Dirt Brown
      start: new THREE.MeshLambertMaterial({ color: 0x0000ff }), // Blue
      exit: new THREE.MeshLambertMaterial({ color: 0xff0000 })   // Red
    };

    this.geometries = {
      ground: new THREE.BoxGeometry(1, 0.1, 1)
    };
  }

  async render(scene, mapData) {
    this.group.clear();
    this.groundGrid = []; // Reset grid

    const mapHeight = mapData.length;
    const mapWidth = mapData[0].length;
    const offsetX = -mapWidth / 2 + 0.5;
    const offsetZ = -mapHeight / 2 + 0.5;

    // Initialize grid rows
    for (let i = 0; i < mapHeight; i++) this.groundGrid[i] = [];

    mapData.forEach((row, z) => {
      row.forEach((type, x) => {
        const posX = x + offsetX;
        const posZ = z + offsetZ;

        // Create Ground Tile
        let groundMat = this.materials.ground;
        if (type === TILE_TYPES.CUME) groundMat = this.materials.start;
        if (type === TILE_TYPES.FAZENDA) groundMat = this.materials.exit;

        // Clone material for Start/Exit so we don't repaint them later
        if (type !== TILE_TYPES.TERRA) groundMat = groundMat.clone();

        const ground = new THREE.Mesh(this.geometries.ground, groundMat);
        ground.position.set(posX, 0.05, posZ);
        ground.receiveShadow = true;
        this.group.add(ground);

        // Store reference for highlighting
        this.groundGrid[z][x] = ground;

        // Assets (Walls/Decoration)
        if (type === TILE_TYPES.PEDRA) {
          const rand = Math.random();
          let assetParams = { key: 'tree', scale: 0.4, yOffset: 0.1 };

          if (rand < 0.5) assetParams = { key: 'tree', scale: 0.4, yOffset: 0 };
          else if (rand < 0.7) assetParams = { key: 'deadTree', scale: 0.4, yOffset: 0 };
          else assetParams = { key: 'rock', scale: 0.5, yOffset: 0.2 };

          const model = assetManager.get(assetParams.key);
          if (model) {
            model.position.set(posX, assetParams.yOffset, posZ);
            model.scale.setScalar(assetParams.scale);
            model.rotation.y = Math.random() * Math.PI * 2;
            this.group.add(model);
          }
        } else {
          // Bush decoration
          if (type === TILE_TYPES.TERRA && Math.random() < 0.1) {
            const bush = assetManager.get('bush');
            if (bush) {
              bush.position.set(posX, 0, posZ);
              bush.scale.setScalar(0.2);
              this.group.add(bush);
            }
          }
        }
      });
    });

    scene.add(this.group);
    return { offsetX, offsetZ };
  }

  // --- NEW METHOD: Changes tile color ---
  highlightTile(x, z, colorHex) {
    if (this.groundGrid[z] && this.groundGrid[z][x]) {
      const mesh = this.groundGrid[z][x];
      // Clone material to ensure we only change THIS tile
      if (!mesh.material.name.includes('highlight')) {
        mesh.material = mesh.material.clone();
        mesh.material.name = 'highlight';
      }
      mesh.material.color.setHex(colorHex);
    }
  }
}