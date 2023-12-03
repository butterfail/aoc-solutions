import fs from 'node:fs';

type Board = string[];

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 4361];

const format = (input: string): string[] => {
  return input.replace(/\r/g, '').trim().split('\n');
};

function considerNumberNeighbors(
  board: Board,
  startY: number,
  startX: number,
  endY: number,
  endX: number,
): boolean {
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      if (y < board.length && x < board[y].length) {
        const char = board[y][x];
        if (!char.match(/\d/) && char !== '.') {
          return true;
        }
      }
    }
  }
  return false;
}

export const solve = (input: string) => {
  const board = format(input);
  const numPattern = /\d+/g;

  let total = 0;

  board.forEach((line, rowNumber) => {
    let match: RegExpExecArray | null;
    while ((match = numPattern.exec(line)) !== null) {
      const num = Number(match[0]);

      if (
        considerNumberNeighbors(
          board,
          Math.max(0, rowNumber - 1),
          Math.max(0, match.index - 1),
          rowNumber + 1,
          match.index + match[0].length,
        )
      ) {
        total += num;
      }
    }
  });

  return total;
};
