export const TILE_TYPES = {
  TERRA: 0,
  PEDRA: 1,
  CUME: 2,
  FAZENDA: 3
};

export class MazeGenerator {
  static generate(width, height) {
    // 1. Inicializa tudo como PAREDE
    // Garante dimensões ímpares para o algoritmo de backtracking funcionar bem
    if (width % 2 === 0) width++;
    if (height % 2 === 0) height++;

    const map = Array.from({ length: height }, () => Array(width).fill(TILE_TYPES.PEDRA));

    // 2. Recursive Backtracking (Escavação)
    // Começa em (1,1) para deixar bordas de parede
    const stack = [[1, 1]];
    map[1][1] = TILE_TYPES.TERRA;

    const directions = [
      [0, -2], // Norte
      [0, 2],  // Sul
      [2, 0],  // Leste
      [-2, 0]  // Oeste
    ];

    while (stack.length > 0) {
      const [currentX, currentY] = stack[stack.length - 1];
      const neighbors = [];

      // Procura vizinhos não visitados (pulando uma parede)
      for (const [dx, dy] of directions) {
        const nx = currentX + dx;
        const ny = currentY + dy;

        if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1 && map[ny][nx] === TILE_TYPES.PEDRA) {
          neighbors.push([nx, ny, dx, dy]);
        }
      }

      if (neighbors.length > 0) {
        // Escolhe um vizinho aleatório
        const [nx, ny, dx, dy] = neighbors[Math.floor(Math.random() * neighbors.length)];

        // Remove a parede entre o atual e o vizinho
        map[currentY + dy / 2][currentX + dx / 2] = TILE_TYPES.TERRA;

        // Marca o vizinho como visitado (caminho)
        map[ny][nx] = TILE_TYPES.TERRA;

        stack.push([nx, ny]);
      } else {
        stack.pop(); // Beco sem saída, volta (backtrack)
      }
    }

    // 3. Braiding (Remover becos sem saída para criar loops)
    // Isso é crucial para ensinar A* (caminhos ótimos vs caminhos longos)
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        if (map[y][x] === TILE_TYPES.TERRA) {
          // Conta paredes ao redor
          let walls = 0;
          if (map[y - 1][x] === TILE_TYPES.PEDRA) walls++;
          if (map[y + 1][x] === TILE_TYPES.PEDRA) walls++;
          if (map[y][x - 1] === TILE_TYPES.PEDRA) walls++;
          if (map[y][x + 1] === TILE_TYPES.PEDRA) walls++;

          // Se tiver 3 paredes, é um beco sem saída (Dead End)
          if (walls === 3) {
            // 20% de chance de abrir o beco (conectar a outro lugar)
            if (Math.random() < 0.2) {
              // Tenta quebrar uma parede aleatória que leve a outro caminho (não para fora do mapa)
              const candidates = [];
              if (y > 1 && map[y - 2][x] === TILE_TYPES.TERRA) candidates.push([0, -1]);
              if (y < height - 2 && map[y + 2][x] === TILE_TYPES.TERRA) candidates.push([0, 1]);
              if (x > 1 && map[y][x - 2] === TILE_TYPES.TERRA) candidates.push([-1, 0]);
              if (x < width - 2 && map[y][x + 2] === TILE_TYPES.TERRA) candidates.push([1, 0]);

              if (candidates.length > 0) {
                const [dx, dy] = candidates[Math.floor(Math.random() * candidates.length)];
                map[y + dy][x + dx] = TILE_TYPES.TERRA;
              }
            }
          }
        }
      }
    }

    // 4. Define Início e Fim
    // Garante que sejam posições válidas (terra)
    map[1][1] = TILE_TYPES.CUME;
    map[height - 2][width - 2] = TILE_TYPES.FAZENDA;

    return map;
  }
}