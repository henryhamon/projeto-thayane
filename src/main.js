import * as THREE from 'three';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import { setupScene } from './pico-parana/SceneSetup.js';
import { TRILHA_DO_PICO, TILE_TYPES } from './pico-parana/MapData.js';

// Initialization
const { scene, camera, renderer } = setupScene();
document.getElementById('game-container').appendChild(renderer.domElement);

// Map Generation
const groupMap = new THREE.Group();
scene.add(groupMap);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = {
  [TILE_TYPES.TERRA]: new THREE.MeshLambertMaterial({ color: 0x8B4513 }), // Brown
  [TILE_TYPES.PEDRA]: new THREE.MeshLambertMaterial({ color: 0x555555 }), // Grey
  [TILE_TYPES.CUME]: new THREE.MeshLambertMaterial({ color: 0xFFD700 }), // Gold
  [TILE_TYPES.FAZENDA]: new THREE.MeshLambertMaterial({ color: 0x228B22 }) // Forest Green
};

// Render Map
const mapWidth = TRILHA_DO_PICO[0].length;
const mapHeight = TRILHA_DO_PICO.length;

TRILHA_DO_PICO.forEach((row, z) => {
  row.forEach((type, x) => {
    const material = materials[type] || materials[TILE_TYPES.PEDRA];
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, 0, z);
    cube.castShadow = true;
    cube.receiveShadow = true;

    // Visual variation for Obstacles
    if (type === TILE_TYPES.PEDRA) {
      cube.scale.y = 1 + Math.random() * 0.5; // Random height
      cube.position.y = (cube.scale.y - 1) / 2;
    } else {
      // Slight offset for ground to prevent z-fighting if we had layers, but here it's fine
      cube.position.y = -0.1;
    }

    groupMap.add(cube);
  });
});

// Center the map in world space
groupMap.position.set(-mapWidth / 2, 0, -mapHeight / 2);

// Player (Roberto) Placeholder
const playerGeo = new THREE.CapsuleGeometry(0.3, 0.8, 4, 8);
const playerMat = new THREE.MeshPhongMaterial({ color: 0x00ff41, emissive: 0x002200, shininess: 100 });
const player = new THREE.Mesh(playerGeo, playerMat);
scene.add(player);

// Find Start Position (CUME)
let startX = 0, startZ = 0;
TRILHA_DO_PICO.forEach((row, z) => {
  row.forEach((type, x) => {
    if (type === TILE_TYPES.CUME) {
      // Adjust coordinates relative to the groupMap centering
      startX = x - mapWidth / 2;
      startZ = z - mapHeight / 2;
    }
  });
});
// Place player at start
player.position.set(startX, 1, startZ);


// CodeMirror Setup
const editor = CodeMirror(document.getElementById('editor'), {
  value: "// -- PROT: ROBERTO // SYSTEM V1.0 --\n// Objetivo: Guiar Roberto do CUME ate a FAZENDA.\n\nfunction main() {\n  // Escreva seu algoritmo de busca aqui\n  \n}",
  mode: "javascript",
  // We rely on CSS overrides in index.html for the 'Terminal' look, 
  // but initializing with default or 'monokai' if we installed it would work too.
  // CSS overrides are safest here.
  lineNumbers: true,
  indentUnit: 2
});

// --- Animation Loop ---
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();

  // Idle animation for Roberto (hovering slightly)
  player.position.y = 1 + Math.sin(time * 2) * 0.1;
  player.rotation.y += 0.02;

  renderer.render(scene, camera);
}

animate();

// --- UI Logic ---
document.getElementById('btn-run').addEventListener('click', () => {
  const code = editor.getValue();
  console.log("Executing Protocol:", code);
  document.getElementById('status-readout').innerText = "STATUS: EXECUTANDO ANALISE...";

  // TODO: Implement code execution sandbox
  setTimeout(() => {
    document.getElementById('status-readout').innerText = "STATUS: SISTEMA ONLINE";
  }, 1000);
});

document.getElementById('btn-reset').addEventListener('click', () => {
  player.position.set(startX, 1, startZ);
  player.rotation.set(0, 0, 0);
  document.getElementById('status-readout').innerText = "STATUS: REINICIADO";
});
