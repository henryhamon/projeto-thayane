import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class AssetManager {
  constructor() {
    if (AssetManager.instance) {
      return AssetManager.instance;
    }
    AssetManager.instance = this;

    this.loader = new GLTFLoader();
    this.assets = {};
    this.isLoaded = false;
  }

  async loadAll() {
    if (this.isLoaded) return;

    const assetsToLoad = {
      tree: './assets/Tree_1_A_Color1.gltf',
      deadTree: './assets/Tree_Bare_1_A_Color1.gltf',
      rock: './assets/Rock_1_A_Color1.gltf',
      bush: './assets/Bush_1_A_Color1.gltf'
    };

    const promises = Object.entries(assetsToLoad).map(([key, url]) => {
      return this.loadModel(key, url);
    });

    try {
      await Promise.all(promises);
      this.isLoaded = true;
      console.log("All assets loaded:", Object.keys(this.assets));
    } catch (error) {
      console.error("Error loading assets:", error);
      throw error;
    }
  }

  loadModel(key, url) {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;

          // Optimization: Enable shadows on all meshes
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          this.assets[key] = model;
          resolve(model);
        },
        undefined,
        (error) => {
          console.error(`Failed to load ${key} from ${url}`, error);
          reject(error);
        }
      );
    });
  }

  get(key) {
    if (!this.assets[key]) {
      console.warn(`Asset '${key}' request but not found.`);
      return null;
    }
    return this.assets[key].clone();
  }
}

export const assetManager = new AssetManager();
