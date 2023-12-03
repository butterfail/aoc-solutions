import fs from 'node:fs';

type Board = string[];
type GearNumbers = Map<string, number[]>;

const testInput = fs.readFileSync(new URL('./part_2.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 467835];

const format = (input: string): string[] => {
  return input.replace(/\r/g, '').trim().split('\n');
};

function considerNumberNeighbors(
  board: Board,
  gearNumbers: GearNumbers,
  startY: number,
  startX: number,
  endY: number,
  endX: number,
  num: number,
): boolean {
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      if (y < board.length && x < board[y].length) {
        const char = board[y][x];
        if (!char.match(/\d/) && char !== '.') {
          if (char === '*') {
            const key = `${y},${x}`;
            if (!gearNumbers.has(key)) {
              gearNumbers.set(key, []);
            }
            gearNumbers.get(key)!.push(num);
          }
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

  const gearNumbers: GearNumbers = new Map();
  let ratioTotal = 0;

  board.forEach((line, rowNumber) => {
    let match: RegExpExecArray | null;
    while ((match = numPattern.exec(line)) !== null) {
      const num = Number(match[0]);

      considerNumberNeighbors(
        board,
        gearNumbers,
        Math.max(0, rowNumber - 1),
        Math.max(0, match.index - 1),
        rowNumber + 1,
        match.index + match[0].length,
        num,
      );
    }
  });

  gearNumbers.forEach((values) => {
    if (values.length === 2) {
      ratioTotal += values[0] * values[1];
    }
  });

  return ratioTotal;
};
