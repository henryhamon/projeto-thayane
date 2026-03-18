import { pyLoader } from './PyLoader.js';

export class CodeRunner {
    constructor() { }

    async runUserCode(userCode, mapData, language = 'python') {
        const pyodide = pyLoader.getPyodide();

        pyodide.globals.set("GAME_MAP_RAW", mapData);

        const ROBERTO_PY_SOURCE = `
class RobertoHardware:
    def __init__(self, map_data):
        self.map = map_data
        self.logs = []
        self.h = len(map_data)
        self.w = len(map_data[0])
        self.x = 0
        self.y = 0
        for r in range(self.h):
            for c in range(self.w):
                if self.map[r][c] == 2:
                    self.x = c
                    self.y = r
        self.dir = 0 

    def mover(self):
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
        dx, dy = self._get_delta()
        nx, ny = self.x + dx, self.y + dy
        if nx < 0 or ny < 0 or nx >= self.w or ny >= self.h:
            return 'PAREDE'
        tile = self.map[ny][nx]
        if tile == 1: return 'PAREDE'
        if tile == 3: return 'SAIDA'
        return 'LIVRE'

    def dizer(self, msg):
        self.logs.append({'action': 'PRINT', 'message': str(msg)})

    def escreva(self, msg):
        self.dizer(msg)

    def _get_delta(self):
        if self.dir == 0: return 0, -1
        if self.dir == 1: return 1, 0
        if self.dir == 2: return 0, 1
        if self.dir == 3: return -1, 0
        return 0, 0

roberto = RobertoHardware(GAME_MAP_RAW)

# Funções auxiliares globais para mapear as chamadas do Portugol
def mover():
    roberto.mover()
    
def virar_esquerda():
    roberto.virar_esquerda()

def virar_direita():
    roberto.virar_direita()
    
def sensor():
    return roberto.sensor()

# Mapeamos para 'dizer' para não conflitar com a palavra reservada 'escreva' do meuPiá
def dizer(msg):
    roberto.dizer(msg)
`;

        let finalPythonLogic = userCode;

        if (language === 'meupia') {
            await pyLoader.installMeuPia();

            let preprocessedCode = userCode.replace(/roberto\.mover\(\)/g, 'mover()');
            preprocessedCode = preprocessedCode.replace(/roberto\.virar_esquerda\(\)/g, 'virar_esquerda()');
            preprocessedCode = preprocessedCode.replace(/roberto\.virar_direita\(\)/g, 'virar_direita()');
            preprocessedCode = preprocessedCode.replace(/roberto\.sensor\(\)/g, 'sensor()');
            preprocessedCode = preprocessedCode.replace(/roberto\.escreva/g, 'dizer');

            pyodide.globals.set("codigo_portugol", preprocessedCode);

            await pyodide.runPythonAsync(`
                import os
                import sys
                from meuPia.compiler import main 
                
                # --- MÁGICA DE ENGENHARIA (MONKEY PATCH ROBUSTO) ---
                for mod_name, mod in sys.modules.items():
                    if hasattr(mod, 'SemanticAnalyzer') and not hasattr(mod, '_patched_roberto'):
                        sa_class = getattr(mod, 'SemanticAnalyzer')
                        _old_init = sa_class.__init__
                        
                        def _new_init(self, lexemes):
                            _old_init(self, lexemes)
                            # Registra as funções globais no analisador semântico
                            self.declared_functions.append({"lexeme": "mover", "token": "ID"})
                            self.declared_functions.append({"lexeme": "virar_esquerda", "token": "ID"})
                            self.declared_functions.append({"lexeme": "virar_direita", "token": "ID"})
                            self.declared_functions.append({"lexeme": "sensor", "token": "ID"})
                            self.declared_functions.append({"lexeme": "dizer", "token": "ID"})
                            
                        sa_class.__init__ = _new_init
                        setattr(mod, '_patched_roberto', True)
                        break
                # ----------------------------------------------------

                os.makedirs("output", exist_ok=True)
                if os.path.exists("output/main.py"):
                    os.remove("output/main.py")
                
                with open("main.por", "w", encoding="utf-8") as f:
                    f.write(codigo_portugol)
                
                try:
                    main("main.por", "output")
                except Exception as e:
                    pass
            `);

            finalPythonLogic = pyodide.runPython(`
                import os
                if not os.path.exists("output/main.py"):
                    raise SyntaxError("Erro de Compilação no meuPiá! Verifique a sintaxe do Portugol.")
                    
                with open("output/main.py", "r", encoding="utf-8") as f:
                    _codigo_gerado = f.read()
                
                _codigo_gerado
            `);
        }

        try {
            pyodide.runPython(ROBERTO_PY_SOURCE);
        } catch (apiError) {
            console.error("Erro interno na API do Roberto:", apiError);
            throw new Error("Falha ao carregar hardware virtual do Roberto.");
        }

        try {
            pyodide.runPython(finalPythonLogic);
        } catch (e) {
            console.error("Runtime Error:", e);
            const cleanMessage = e.message.replace(/File "<exec>".*/g, "").trim();
            throw new Error(`Erro no seu código:\\n\${cleanMessage}`);
        }

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