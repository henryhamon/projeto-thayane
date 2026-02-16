import { pyLoader } from './system/PyLoader.js';
import { codeRunner } from './system/CodeRunner.js';
import { assetManager } from './system/AssetManager.js';
import * as THREE from 'three';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/python/python';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/elegant.css';
import { setupScene } from './pico-parana/SceneSetup.js';
import { MazeGenerator, TILE_TYPES } from './pico-parana/MapData.js';
import { MazeRenderer } from './pico-parana/MazeRenderer.js';
import { Rover } from './roberto/Rover.js';
import { CameraControls } from './ui/CameraControls.js';

// --- Initialization ---
const { scene, camera, renderer } = setupScene();
document.getElementById('game-container').appendChild(renderer.domElement);

const fogColor = 0x2f4f4f;
scene.fog = new THREE.Fog(fogColor, 20, 100);
scene.background = new THREE.Color(fogColor);

let rover, mazeRenderer;
let startX = 0, startZ = 0;
let currentMapData = [];
const clock = new THREE.Clock();

// --- Main Startup Sequence ---
(async () => {
  const statusEl = document.getElementById('status-readout');

  try {
    statusEl.innerText = "STATUS: CARREGANDO ASSETS...";
    await assetManager.loadAll();

    statusEl.innerText = "STATUS: GERANDO TERRENO...";
    mazeRenderer = new MazeRenderer();

    // Generate Map (Odd dimensions)
    currentMapData = MazeGenerator.generate(15, 15);

    const { offsetX, offsetZ } = await mazeRenderer.render(scene, currentMapData);

    rover = new Rover();
    rover.addToScene(scene);

    // Set Rover Dependencies
    rover.currentMapData = currentMapData;
    rover.mazeRenderer = mazeRenderer;

    // Find Start
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

    initCameraControls(camera, rover);

    statusEl.innerText = "STATUS: INICIALIZANDO PYTHON...";
    await pyLoader.init();

    statusEl.innerText = "STATUS: SISTEMA ONLINE (PYTHON 3.11)";
    animate();

  } catch (e) {
    statusEl.innerText = "STATUS: ERRO CRÍTICO";
    console.error(e);
  }
})();

function initCameraControls(camera, target) {
  try {
    const controls = new CameraControls(camera, target);
  } catch (e) {
    console.error("Failed to init camera controls", e);
  }
}

async function generateLevel() {
  const statusEl = document.getElementById('status-readout');
  statusEl.innerText = "STATUS: GERANDO NOVO TERRENO...";

  // 1. Gera Matriz 15x15
  currentMapData = MazeGenerator.generate(15, 15);

  // 2. Renderiza 3D (O renderer limpa os objetos antigos automaticamente)
  const { offsetX, offsetZ } = await mazeRenderer.render(scene, currentMapData);

  // 3. Encontra Ponto de Partida
  currentMapData.forEach((row, z) => {
    row.forEach((type, x) => {
      if (type === TILE_TYPES.CUME) {
        startX = x + offsetX;
        startZ = z + offsetZ;
      }
    });
  });

  // 4. Atualiza o Roberto
  rover.setPosition(startX, startZ);
  rover.setRotation('N');
  rover.currentMapData = currentMapData; // Atualiza o "cérebro" físico do colisor
  rover.mazeRenderer = mazeRenderer;     // Atualiza a referência para pintar o chão
  rover.actionQueue = [];
  rover.isMoving = false;
  
  // Atualiza controles da câmera para focar no novo local
  if(controls) controls.focusTarget();
  
  statusEl.innerText = "STATUS: TERRENO PRONTO.";
}

const editor = CodeMirror(document.getElementById('editor'), {
  value: `# -- PRJ: ROBERTO 
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
  theme: "dracula",
  lineNumbers: true,
  indentUnit: 4,
  extraKeys: {
    "Tab": function (cm) {
      if (cm.somethingSelected()) cm.indentSelection("add");
      else cm.replaceSelection("    ", "end");
    }
  }
});

// Fullscreen & Theme Toggles
const terminalHeader = document.getElementById('terminal-header');
const container = document.getElementById('interface-container');
const btnTheme = document.getElementById('btn-theme-toggle');

if (terminalHeader && container) {
  terminalHeader.addEventListener('click', (e) => {
    if (e.target.closest('#btn-theme-toggle')) return;
    container.classList.toggle('terminal-fullscreen');
    if (typeof editor !== 'undefined') setTimeout(() => editor.refresh(), 50);
  });
}

if (btnTheme) {
  btnTheme.addEventListener('click', (e) => {
    e.stopPropagation();
    const current = editor.getOption('theme');
    const next = current === 'dracula' ? 'elegant' : 'dracula';
    editor.setOption('theme', next);
    btnTheme.innerText = next === 'dracula' ? '🌙' : '☀️';
  });
}

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

document.getElementById('btn-run').addEventListener('click', async () => {
  if (!rover) return;
  const code = editor.getValue();
  const statusEl = document.getElementById('status-readout');
  statusEl.innerText = "STATUS: PROCESSANDO...";

  try {
    const logs = await codeRunner.runUserCode(code, currentMapData);
    console.log("Planos do Roberto:", logs);
    rover.processLogs(logs);
    statusEl.innerText = "STATUS: EXECUTANDO MOVIMENTOS...";

    rover.onWin = () => {
      statusEl.innerText = "STATUS: RESGATE CONCLUIDO!";
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
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

document.getElementById('btn-new-map').addEventListener('click', async () => {
    // if(!confirm("Gerar novo mapa?")) return;
    await generateLevel();
    rover.actionQueue = []; 
});

document.getElementById('btn-download').addEventListener('click', () => {
    const code = editor.getValue();
    const blob = new Blob([code], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    // Nome do arquivo com data/hora para evitar duplicatas
    const timestamp = new Date().toISOString().slice(0,19).replace(/:/g,"-");
    link.download = `roberto_solucao_${timestamp}.py`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
