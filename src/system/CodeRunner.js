import { pyLoader } from './PyLoader.js';

export class CodeRunner {
  constructor() { }

  // Agora aceita mapData como argumento
  async runUserCode(userCode, mapData) {
    const pyodide = pyLoader.getPyodide();

    // 1. Prepara o Mapa para o Python
    // O mapData é um Array de Arrays JS. O Pyodide converte automaticamente para List of Lists.
    pyodide.globals.set("GAME_MAP_RAW", mapData);

    // 2. Define a Hardware API (agora com Visão!)
    // Atualizamos a classe para rastrear a posição X,Y virtualmente
    const ROBERTO_PY_SOURCE = `
class RobertoHardware:
    def __init__(self, map_data):
        self.map = map_data
        self.logs = []
        self.h = len(map_data)
        self.w = len(map_data[0])
        
        # Encontra posicao inicial (2 = CUME)
        self.x = 0
        self.y = 0
        for r in range(self.h):
            for c in range(self.w):
                if self.map[r][c] == 2:
                    self.x = c
                    self.y = r
        
        # Direcao: 0=N, 1=E, 2=S, 3=W (Baseado no Rover.js)
        self.dir = 0 

    def mover(self):
        # Atualiza posicao virtual
        dx, dy = self._get_delta()
        self.x += dx
        self.y += dy
        self.logs.append({'action': 'MOVE'})

    def virar_esquerda(self):
        self.dir = (self.dir - 1) % 4
        self.logs.append({'action': 'TURN_LEFT'})

    def virar_direita(self):
        self.dir = (self.dir + 1) % 4
        self.logs.append({'action': 'TURN_RIGHT'})

    def sensor(self):
        # Olha para o bloco a frente
        dx, dy = self._get_delta()
        nx, ny = self.x + dx, self.y + dy
        
        # Limites do mapa
        if nx < 0 or ny < 0 or nx >= self.w or ny >= self.h:
            return 'PAREDE'
            
        tile = self.map[ny][nx]
        if tile == 1: return 'PAREDE' # Pedra
        if tile == 3: return 'SAIDA'  # Fazenda
        return 'LIVRE'

    def escreva(self, msg):
        # Log que aparece no console JS
        self.logs.append({'action': 'PRINT', 'message': str(msg)})

    def _get_delta(self):
        # N(-Z/row), S(+Z/row), E(+X/col), W(-X/col)
        # No MapData: row é Y(Z visual), col é X
        if self.dir == 0: return 0, -1 # N
        if self.dir == 1: return 1, 0  # E
        if self.dir == 2: return 0, 1  # S
        if self.dir == 3: return -1, 0 # W
        return 0, 0

# Instancia o hardware passando o mapa injetado
roberto = RobertoHardware(GAME_MAP_RAW)
`;

    // Step A: Executar Python Puro
    // Removemos a transpilação do meuPia, focando em Python nativo
    const fullScript = `
${ROBERTO_PY_SOURCE}

# --- CODIGO DO ALUNO ---
${userCode}
`;

    try {
      pyodide.runPython(fullScript);
    } catch (e) {
      console.error("Runtime Error:", e);
      throw new Error(`Erro Python: ${e.message}`);
    }

    // Extrai logs
    const robertoProxy = pyodide.globals.get('roberto');
    if (!robertoProxy) throw new Error("Erro Crítico: Roberto sumiu da memória.");

    const logsProxy = robertoProxy.logs;
    const logs = logsProxy.toJs({ dict_converter: Object.fromEntries });

    logsProxy.destroy();
    robertoProxy.destroy();

    return logs;
  }
}

export const codeRunner = new CodeRunner();