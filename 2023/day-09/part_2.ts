import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_2.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 2];

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
    const firsts: Array<number> = [];

    while (line.length > 1) {
      const nextLine: Array<number> = [];
      firsts.push(line[0]);

      for (let i = 0; i < line.length - 1; i++) {
        nextLine.push(line[i + 1] - line[i]);
      }

      line = nextLine;
    }

    if (line.length === 1) {
      firsts.push(line[0]);
    }

    sum += firsts.reverse().reduce((a, v) => v - a, 0);
  }

  return sum;
};
