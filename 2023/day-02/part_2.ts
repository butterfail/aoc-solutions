import fs from 'node:fs';

type Colors = 'blue' | 'red' | 'green';

const testInput = fs.readFileSync(new URL('./part_2.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 2286];

const format = (input: string): string[][] => {
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map((line) => line.split(': ')[1].match(/(\d+) (red|green|blue)/g) as string[]);
};

export const solve = (input: string) => {
  const lines = format(input);
  let powerSum = 0;

  for (const records of lines) {
    const minimums: Record<Colors, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const record of records) {
      const [ID, color] = record.split(' ');
      minimums[color as Colors] = Math.max(minimums[color as Colors], Number(ID));
    }

    powerSum += minimums.red * minimums.green * minimums.blue;
  }

  return powerSum;
};
