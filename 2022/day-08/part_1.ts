import fs from 'node:fs';

type Tree = {
  height: number;
  visible: boolean;
};

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 21];

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
  grid[y][x].visible = true;
  let maximum = grid[y][x].height;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    y += dy;
    x += dx;

    if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
      break;
    }

    if (grid[y][x] && grid[y][x].height > maximum) {
      grid[y][x].visible = true;
      maximum = grid[y][x].height;
    }
  }
};

export const solve = (input: string) => {
  const grid = format(input);

  // columns
  for (let i = 0; i < grid[0].length; i++) {
    markVisible(0, i, 1, 0, grid);
    markVisible(grid.length - 1, i, -1, 0, grid);
  }

  // rows
  for (let i = 0; i < grid.length; i++) {
    markVisible(i, 0, 0, 1, grid);
    markVisible(i, grid[0].length - 1, 0, -1, grid);
  }

  return grid.flat().filter((tree) => tree.visible).length;
};
