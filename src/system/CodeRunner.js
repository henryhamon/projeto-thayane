import { pyLoader } from './PyLoader.js';

// Definição da API do Hardware (Mock) em Python
const ROBERTO_PY_SOURCE = `
import sys

class RobertoHardware:
    def __init__(self):
        self.logs = []

    def mover(self):
        self.logs.append({'action': 'MOVE'})

    def virar_esquerda(self):
        self.logs.append({'action': 'TURN_LEFT'})

    def virar_direita(self):
        self.logs.append({'action': 'TURN_RIGHT'})

    def sensor(self):
        # Retorna 'LIVRE', 'PAREDE' ou 'SAIDA'
        # No futuro podemos injetar o estado real aqui
        return 'LIVRE'

    def escreva(self, msg):
        self.logs.append({'action': 'PRINT', 'message': str(msg)})

# Instância global que o aluno vai usar
roberto = RobertoHardware()
`;

export class CodeRunner {
  constructor() {
  }

  async runUserCode(userCode) {
    const pyodide = pyLoader.getPyodide();

    const fullScript = `
${ROBERTO_PY_SOURCE}

# --- CÓDIGO DO ALUNO ABAIXO ---
${userCode}
`;

    try {
      // Executa o Python puro
      pyodide.runPython(fullScript);
    } catch (e) {
      console.error("Runtime Error:", e);
      // Formata o erro para ficar legível para o aluno
      throw new Error(`Erro Python: ${e.message}`);
    }

    // Extrai os logs da memória do Python
    const robertoProxy = pyodide.globals.get('roberto');

    if (!robertoProxy) {
      throw new Error("Erro Crítico: Instância do Roberto desapareceu da memória.");
    }

    const logsProxy = robertoProxy.logs;
    const logs = logsProxy.toJs(); // Converte Proxy -> Array JS

    // Limpeza de memória (importante em WASM)
    logsProxy.destroy();
    robertoProxy.destroy();

    return logs;
  }
}

export const codeRunner = new CodeRunner();