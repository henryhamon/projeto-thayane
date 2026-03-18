import { pyLoader } from './system/PyLoader.js';
import { codeRunner } from './system/CodeRunner.js';
import { assetManager } from './system/AssetManager.js';
import * as THREE from 'three';
import { setupScene } from './pico-parana/SceneSetup.js';
import { MazeGenerator, TILE_TYPES } from './pico-parana/MapData.js';
import { MazeRenderer } from './pico-parana/MazeRenderer.js';
import { Rover } from './roberto/Rover.js';
import { CameraControls } from './ui/CameraControls.js';

import { basicSetup, EditorView } from 'codemirror';
import { EditorState, Compartment } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { meuPiaLanguage } from './meupia-lang.js'; 
import { version } from '../package.json';

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
let controls;

// --- Main Startup Sequence ---
console.log(`%c🚀 Projeto Thayane - Sistema Online v${version}`, 'color: #00ff00; font-weight: bold; font-size: 14px; background: #222; padding: 4px; border-radius: 4px;');
(async () => {
  const statusEl = document.getElementById('status-readout');

  try {
    statusEl.innerText = "STATUS: CARREGANDO ASSETS...";
    await assetManager.loadAll();

    statusEl.innerText = "STATUS: GERANDO TERRENO...";
    mazeRenderer = new MazeRenderer();

    currentMapData = MazeGenerator.generate(15, 15);
    const { offsetX, offsetZ } = await mazeRenderer.render(scene, currentMapData);

    rover = new Rover();
    rover.addToScene(scene);
    rover.currentMapData = currentMapData;
    rover.mazeRenderer = mazeRenderer;

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

    controls = new CameraControls(camera, rover);

    statusEl.innerText = "STATUS: INICIALIZANDO PYTHON...";
    await pyLoader.init();

    statusEl.innerText = "STATUS: SISTEMA ONLINE (PYTHON 3.11)";
    animate();

  } catch (e) {
    statusEl.innerText = "STATUS: ERRO CRÍTICO";
    console.error(e);
  }
})();

async function generateLevel() {
  const statusEl = document.getElementById('status-readout');
  statusEl.innerText = "STATUS: GERANDO NOVO TERRENO...";

  currentMapData = MazeGenerator.generate(15, 15);
  const { offsetX, offsetZ } = await mazeRenderer.render(scene, currentMapData);

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
  rover.currentMapData = currentMapData; 
  rover.mazeRenderer = mazeRenderer;     
  rover.actionQueue = [];
  rover.isMoving = false;
  
  if(controls) controls.focusTarget();
  statusEl.innerText = "STATUS: TERRENO PRONTO.";
}

// --- TEMPLATES DAS LINGUAGENS ---
const templatePython = `
# -- PRJ: ROBERTO 
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
`;

const templateMeuPia = `
// -- PRJ: ROBERTO 
// Objetivo: Guiar Roberto do CUME ate a FAZENDA.

algoritmo "FugaDoLabirinto"
inicio
    // Comandos disponiveis:
    // roberto.mover()
    // roberto.virar_esquerda()
    // roberto.virar_direita()
    // se roberto.sensor() == "LIVRE" entao ...
    
    para i de 1 ate 4 faca
        roberto.mover()
        roberto.escreva("Passo")
    fim_para
fim_algoritmo
`;

const languageConfig = new Compartment();
const themeConfig = new Compartment();

const initialState = EditorState.create({
  doc: templatePython,
  extensions: [
    basicSetup,
    languageConfig.of(python()), // Inicia com Python
    themeConfig.of(oneDark)      // Inicia com tema escuro
  ]
});

const editorView = new EditorView({
  state: initialState,
  parent: document.getElementById('editor')
});

const terminalHeader = document.getElementById('terminal-header');
const container = document.getElementById('interface-container');
const btnTheme = document.getElementById('btn-theme-toggle');

if (terminalHeader && container) {
  terminalHeader.addEventListener('click', (e) => {
    if (e.target.closest('#btn-theme-toggle')) return;
    container.classList.toggle('terminal-fullscreen');
  });
}

let isDarkTheme = true;
if (btnTheme) {
  btnTheme.addEventListener('click', (e) => {
    e.stopPropagation();
    isDarkTheme = !isDarkTheme;
    editorView.dispatch({
      effects: themeConfig.reconfigure(isDarkTheme ? oneDark : []) // Array vazio volta pro tema claro base
    });
    btnTheme.innerText = isDarkTheme ? '🌙' : '☀️';
  });
}

const radioButtons = document.querySelectorAll('input[name="editor-lang"]');
const btnDownload = document.getElementById('btn-download');

radioButtons.forEach(radio => {
  radio.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    const currentCode = editorView.state.doc.toString().trim();

    if (selectedLang === 'meupia') {
      editorView.dispatch({ effects: languageConfig.reconfigure(meuPiaLanguage) });
      btnDownload.innerHTML = '💾 Download .POR';
      
      if (currentCode === "" || currentCode === templatePython.trim()) {
        editorView.dispatch({
          changes: { from: 0, to: editorView.state.doc.length, insert: templateMeuPia }
        });
      }
    } else {
      editorView.dispatch({ effects: languageConfig.reconfigure(python()) });
      btnDownload.innerHTML = '💾 Download .PY';
      
      if (currentCode === "" || currentCode === templateMeuPia.trim()) {
        editorView.dispatch({
          changes: { from: 0, to: editorView.state.doc.length, insert: templatePython }
        });
      }
    }
  });
});

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
  const code = editorView.state.doc.toString();
  const statusEl = document.getElementById('status-readout');
  const selectedLang = document.querySelector('input[name="editor-lang"]:checked').value;
  
  statusEl.innerText = "STATUS: PROCESSANDO...";

  try {
    const logs = await codeRunner.runUserCode(code, currentMapData, selectedLang);
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
    statusEl.innerText = "STATUS: ERRO DE COMPILAÇÃO";
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
    await generateLevel();
    rover.actionQueue = []; 
});

document.getElementById('btn-download').addEventListener('click', () => {
    const code = editorView.state.doc.toString();
    const selectedLang = document.querySelector('input[name="editor-lang"]:checked').value;
    const extension = selectedLang === 'meupia' ? '.por' : '.py'; 
    
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    
    const timestamp = new Date().toISOString().slice(0,19).replace(/:/g,"-");
    link.download = `roberto_solucao_${timestamp}${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});