import { pyLoader } from './system/PyLoader.js';
import { codeRunner } from './system/CodeRunner.js';
import { assetManager } from './system/AssetManager.js';
import * as THREE from 'three';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python';
import { setupScene } from './pico-parana/SceneSetup.js';
// IMPORT ATUALIZADO: Trocamos TRILHA_DO_PICO por MazeGenerator
import { MazeGenerator, TILE_TYPES } from './pico-parana/MapData.js';
import { MazeRenderer } from './pico-parana/MazeRenderer.js';
import { Rover } from './roberto/Rover.js';
import { CameraControls } from './ui/CameraControls.js';

// --- Initialization ---
const { scene, camera, renderer } = setupScene();
document.getElementById('game-container').appendChild(renderer.domElement);

// Add Atmospheric Fog
const fogColor = 0x2f4f4f;
scene.fog = new THREE.Fog(fogColor, 20, 100); // Neblina reduzida
scene.background = new THREE.Color(fogColor);

// Global Variables
let rover;
let mazeRenderer;
let startX = 0, startZ = 0;
// VARIÁVEL GLOBAL DO MAPA (para usar no reset se quiser manter o mesmo mapa)
let currentMapData = [];
const clock = new THREE.Clock();

// --- Main Startup Sequence ---
(async () => {
  const statusEl = document.getElementById('status-readout');

  try {
    statusEl.innerText = "STATUS: CARREGANDO ASSETS...";
    await assetManager.loadAll();

    // 2. Generate Maze (Dynamic)
    statusEl.innerText = "STATUS: GERANDO TERRENO...";
    mazeRenderer = new MazeRenderer();

    // GERAÇÃO PROCEDURAL AQUI: (21x21 garante estrutura correta)
    currentMapData = MazeGenerator.generate(21, 21);

    const { offsetX, offsetZ } = await mazeRenderer.render(scene, currentMapData);

    // 3. Setup Rover
    rover = new Rover();
    rover.addToScene(scene);

    // Find Start Position
    currentMapData.forEach((row, z) => {
      row.forEach((type, x) => {
        if (type === TILE_TYPES.CUME) {
          startX = x + offsetX;
          startZ = z + offsetZ;
        }
      });
    });

    rover.setPosition(startX, startZ);
    rover.setRotation('N');
    rover.currentMapData = currentMapData; // Pass Map Context for Collision

    // 4. Initialize Camera Controls
    initCameraControls(camera, rover);

    statusEl.innerText = "STATUS: INICIALIZANDO PYTHON RUNTIME...";
    await pyLoader.init();

    statusEl.innerText = "STATUS: SISTEMA ONLINE (PYTHON 3.11)";
    animate();

  } catch (e) {
    statusEl.innerText = "STATUS: ERRO CRÍTICO";
    console.error(e);
  }
})();

// --- Helper: Camera Controls Init ---
function initCameraControls(camera, target) {
  try {
    const controls = new CameraControls(camera, target);
  } catch (e) {
    console.error("Failed to init camera controls", e);
  }
}

const editor = CodeMirror(document.getElementById('editor'), {
  value: `# -- PROT: ROBERTO // SYSTEM V2.0 (PYTHON) --
# Objetivo: Guiar Roberto do CUME ate a FAZENDA.

def main():
  # Comandos disponiveis:
  # roberto.mover()
  # roberto.virar_esquerda()
  # roberto.virar_direita()
  # if roberto.sensor() == 'LIVRE': ...
  
  for i in range(4):
      roberto.mover()
      roberto.escreva(f"Passo {i}")

# Executa a funcao principal
main()
`,
  mode: "python",
  theme: "default",
  lineNumbers: true,
  indentUnit: 4,
  extraKeys: {
    "Tab": function (cm) {
      if (cm.somethingSelected()) {
        cm.indentSelection("add");
      } else {
        cm.replaceSelection("    ", "end"); // Soft tabs
      }
    }
  }
});

// Fullscreen Toggle
const terminalHeader = document.getElementById('terminal-header');
const container = document.getElementById('interface-container');

if (terminalHeader && container) {
  terminalHeader.addEventListener('click', () => {
    container.classList.toggle('terminal-fullscreen');
    // Refresh CodeMirror if needed (using global editor variable)
    if (typeof editor !== 'undefined') {
      setTimeout(() => editor.refresh(), 50);
    }
  });
}

// --- Animation Loop ---
function animate() {
  requestAnimationFrame(animate);
  if (!rover) return;

  const dt = clock.getDelta();
  rover.update(dt);

  if (rover.mesh) {
    rover.mesh.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.05;
  }

  renderer.render(scene, camera);
}

// --- UI Logic ---
document.getElementById('btn-run').addEventListener('click', async () => {
  if (!rover) return;
  const code = editor.getValue();
  const statusEl = document.getElementById('status-readout');
  statusEl.innerText = "STATUS: PROCESSANDO...";

  try {
    const logs = await codeRunner.runUserCode(code);
    rover.processLogs(logs);
    statusEl.innerText = "STATUS: EXECUTANDO MOVIMENTOS...";

    // Hook Events
    rover.onWin = () => {
      statusEl.innerText = "STATUS: RESGATE CONCLUIDO!";
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      alert('PARABENS! Roberto chegou a Fazenda!');
    };

    rover.onCrash = () => {
      statusEl.innerText = "STATUS: COLISAO DETECTADA (PARE!)";
    };

  } catch (e) {
    console.error(e);
    alert(e.message);
    statusEl.innerText = "STATUS: ERRO DE COMPILACAO";
  }
});

document.getElementById('btn-reset').addEventListener('click', () => {
  if (rover) {
    rover.setPosition(startX, startZ);
    rover.setRotation('N');
    rover.actionQueue = [];
    rover.isMoving = false;
    document.getElementById('status-readout').innerText = "STATUS: REINICIADO";
  }
});