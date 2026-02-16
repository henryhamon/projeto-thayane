import * as THREE from 'three';
import { assetManager } from '../system/AssetManager.js';
import { TILE_TYPES } from './MapData.js'; // <--- IMPORT QUE FALTAVA

export class MazeRenderer {
  constructor() {
    this.group = new THREE.Group();

    // Materials (Ground/Start/Exit remain, Walls replaced by Assets)
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
    // Clear previous render
    this.group.clear();

    const mapHeight = mapData.length;
    const mapWidth = mapData[0].length;

    // Offset to center the maze
    const offsetX = -mapWidth / 2 + 0.5;
    const offsetZ = -mapHeight / 2 + 0.5;

    mapData.forEach((row, z) => {
      row.forEach((type, x) => {
        const posX = x + offsetX;
        const posZ = z + offsetZ;

        // Ground Tile (Base for everything)
        let groundMat = this.materials.ground;
        if (type === TILE_TYPES.CUME) groundMat = this.materials.start;
        if (type === TILE_TYPES.FAZENDA) groundMat = this.materials.exit;

        const ground = new THREE.Mesh(this.geometries.ground, groundMat);
        ground.position.set(posX, 0.05, posZ);
        ground.receiveShadow = true;
        this.group.add(ground);

        if (type === TILE_TYPES.PEDRA) {
          // FOREST WALLS: Trees and Rocks
          const rand = Math.random();
          let assetParams = { key: 'tree', scale: 0.4, yOffset: 0.1 };

          if (rand < 0.5) {
            assetParams = { key: 'tree', scale: 0.4, yOffset: 0 };
          } else if (rand < 0.7) {
            assetParams = { key: 'deadTree', scale: 0.4, yOffset: 0 };
          } else {
            assetParams = { key: 'rock', scale: 0.5, yOffset: 0.2 };
          }

          const model = assetManager.get(assetParams.key);
          if (model) {
            model.position.set(posX, assetParams.yOffset, posZ);
            model.scale.setScalar(assetParams.scale);
            model.rotation.y = Math.random() * Math.PI * 2; // Random Rotation
            this.group.add(model);
          } else {
            // Fallback if asset missing
            const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x555555 }));
            box.position.set(posX, 0.5, posZ);
            this.group.add(box);
          }

        } else {
          // PATH DECORATION: Bushes
          // 10% chance for a bush on a path
          if (Math.random() < 0.1) {
            const bush = assetManager.get('bush');
            if (bush) {
              // Offset to corner to not block center
              const cornerX = (Math.random() > 0.5 ? 0.3 : -0.3);
              const cornerZ = (Math.random() > 0.5 ? 0.3 : -0.3);

              bush.position.set(posX + cornerX, 0, posZ + cornerZ);
              bush.scale.setScalar(0.2);
              bush.rotation.y = Math.random() * Math.PI * 2;
              this.group.add(bush);
            }
          }

          // START/EXIT DECORATION
          if (type === TILE_TYPES.CUME || type === TILE_TYPES.FAZENDA) {
            const rock = assetManager.get('rock');
            if (rock) {
              rock.position.set(posX + 0.3, 0.1, posZ + 0.3);
              rock.scale.setScalar(0.2);
              this.group.add(rock);
            }
          }
        }
      });
    });

    scene.add(this.group);
    return { offsetX, offsetZ };
  }
}