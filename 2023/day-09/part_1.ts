import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 114];

const format = (input: string): Array<Array<number>> => {
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map((l) => l.split(' ').map(Number));
};

export const solve = (input: string) => {
  const lines = format(input);

  let sum = 0;

  for (let line of lines) {
    let last = 0;

    while (line.length > 0) {
      const nextLine: Array<number> = [];
      last = line[line.length - 1];

      for (let i = 0; i < line.length - 1; i++) {
        nextLine.push(line[i + 1] - line[i]);
      }

      line = nextLine;
      sum += last;
    }
  }

  return sum;
};
