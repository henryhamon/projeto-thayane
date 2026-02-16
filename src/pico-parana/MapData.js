export const TILE_TYPES = {
  TERRA: 0,
  PEDRA: 1,
  CUME: 2, // Início
  FAZENDA: 3 // Fim
};

export class MazeGenerator {
  static generate(width, height) {
    // 1. Garante dimensões ímpares (Essencial para labirintos perfeitos)
    if (width % 2 === 0) width++;
    if (height % 2 === 0) height++;

    // Inicializa tudo como PEDRA
    const map = Array.from({ length: height }, () => Array(width).fill(TILE_TYPES.PEDRA));

    // 2. Recursive Backtracking (Gera um labirinto onde tudo é conectado)
    const startX = 1;
    const startY = 1;
    const stack = [[startX, startY]];
    map[startY][startX] = TILE_TYPES.TERRA;

    const directions = [
      [0, -2], [0, 2], [2, 0], [-2, 0] // Pula 2 casas para manter paredes
    ];

    while (stack.length > 0) {
      const [cx, cy] = stack[stack.length - 1];
      const neighbors = [];

      for (const [dx, dy] of directions) {
        const nx = cx + dx;
        const ny = cy + dy;

        // Verifica se está dentro do mapa e se é PEDRA (não visitado)
        if (nx > 0 && nx < width - 1 && ny > 0 && ny < height - 1 && map[ny][nx] === TILE_TYPES.PEDRA) {
          neighbors.push({ nx, ny, dx, dy });
        }
      }

      if (neighbors.length > 0) {
        // Escolhe vizinho aleatório
        const { nx, ny, dx, dy } = neighbors[Math.floor(Math.random() * neighbors.length)];
        // Derruba a parede entre o atual e o vizinho
        map[cy + dy / 2][cx + dx / 2] = TILE_TYPES.TERRA;
        // Marca o vizinho como chão
        map[ny][nx] = TILE_TYPES.TERRA;
        stack.push([nx, ny]);
      } else {
        stack.pop();
      }
    }

    // 3. Braiding Suave (Remove 10% dos becos sem saída para criar loops)
    // Isso evita que o labirinto seja apenas um corredor único
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        if (map[y][x] === TILE_TYPES.TERRA) {
          let walls = 0;
          if (map[y - 1][x] === TILE_TYPES.PEDRA) walls++;
          if (map[y + 1][x] === TILE_TYPES.PEDRA) walls++;
          if (map[y][x - 1] === TILE_TYPES.PEDRA) walls++;
          if (map[y][x + 1] === TILE_TYPES.PEDRA) walls++;

          if (walls === 3 && Math.random() < 0.1) {
            const neighbors = [[0, -1], [0, 1], [-1, 0], [1, 0]];
            const valid = neighbors.filter(([dx, dy]) =>
              y + dy > 0 && y + dy < height - 1 && x + dx > 0 && x + dx < width - 1 && map[y + dy][x + dx] === TILE_TYPES.PEDRA
            );
            if (valid.length > 0) {
              const [dx, dy] = valid[Math.floor(Math.random() * valid.length)];
              map[y + dy][x + dx] = TILE_TYPES.TERRA;
            }
          }
        }
      }
    }

    // 4. POSICIONAMENTO INTELIGENTE DA SAÍDA
    // Roda um BFS (Busca em Largura) para achar o ponto MAIS DISTANTE do início
    const distances = Array.from({ length: height }, () => Array(width).fill(-1));
    const queue = [[startX, startY, 0]];
    distances[startY][startX] = 0;

    let maxDist = 0;
    let farX = startX;
    let farY = startY;

    while (queue.length > 0) {
      const [cx, cy, dist] = queue.shift();

      // Se este ponto for mais longe que o recorde anterior, anota
      if (dist > maxDist) {
        maxDist = dist;
        farX = cx;
        farY = cy;
      }

      // Vizinhos (N, S, L, O)
      const moves = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      for (let [dx, dy] of moves) {
        const nx = cx + dx;
        const ny = cy + dy;
        // Se for chão e ainda não visitado pelo BFS
        if (nx >= 0 && nx < width && ny >= 0 && ny < height &&
          map[ny][nx] === TILE_TYPES.TERRA && distances[ny][nx] === -1) {
          distances[ny][nx] = dist + 1;
          queue.push([nx, ny, dist + 1]);
        }
      }
    }

    // 5. Marca Início e Fim (Garantido que existe caminho entre eles)
    map[startY][startX] = TILE_TYPES.CUME;
    map[farY][farX] = TILE_TYPES.FAZENDA;

    console.log(`Labirinto gerado! Saída em (${farX}, ${farY}) distância: ${maxDist}`);

    return map;
  }
}