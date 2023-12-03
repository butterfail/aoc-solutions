import fs from 'node:fs';

type Tree = {
  height: number;
  visible: boolean;
};

const testInput = fs.readFileSync(new URL('./part_2.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 8];

const format = (input: string): Tree[][] => {
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map((line) =>
      [...line].map((char) => ({
        height: Number(char),
        visible: false,
      })),
    );
};

const markVisible = (y: number, x: number, dy: number, dx: number, grid: Tree[][]) => {
  let visible = 0;
  const maximum = grid[y][x].height;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    y += dy;
    x += dx;

    if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
      break;
    }

    visible++;

    if (grid[y][x] && grid[y][x].height >= maximum) {
      break;
    }
  }

  return visible;
};

export const solve = (input: string) => {
  const grid = format(input);
  let highestScore = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const score =
        markVisible(y, x, -1, 0, grid) *
        markVisible(y, x, 1, 0, grid) *
        markVisible(y, x, 0, 1, grid) *
        markVisible(y, x, 0, -1, grid);

      if (score > highestScore) {
        highestScore = score;
      }
    }
  }

  return highestScore;
};
