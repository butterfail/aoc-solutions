import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 71503];

const format = (input: string): number[] => {
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map((l) => +l.replaceAll(' ', '').split(':')[1]);
};

export const solve = (input: string) => {
  const [time, distance] = format(input);
  const sqrt = Math.sqrt(Math.pow(time, 2) - 4 * distance);
  return Math.ceil((time + sqrt) / 2) - Math.floor((time - sqrt) / 2) - 1;
};
