import fs from 'node:fs';

type Colors = 'blue' | 'red' | 'green';

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 8];

const format = (input: string): string[][] => {
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map((line) => line.split(': ')[1].match(/(\d+) (red|green|blue)/g) as string[]);
};

export const solve = (input: string) => {
  const lines = format(input);

  const limits: Record<Colors, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let possibleGames = (lines.length * (lines.length + 1)) / 2;

  for (let i = 0; i < lines.length; i++) {
    const records = lines[i];

    for (const record of records) {
      const [ID, color] = record.split(' ');
      if (Number(ID) > limits[color as Colors]) {
        possibleGames -= i + 1;
        break;
      }
    }
  }

  return possibleGames;
};
