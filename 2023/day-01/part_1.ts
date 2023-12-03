import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 142];

const format = (input: string): string[] => {
  return input.replace(/\r/g, '').trim().split('\n');
};

export const solve = (input: string) => {
  return format(input)
    .map((line) => {
      const digits = line
        .split('')
        .map(Number)
        .filter((n) => !Number.isNaN(n));

      return Number(`${digits[0]}${digits[digits.length - 1]}`);
    })
    .reduce((acc, value) => acc + value, 0);
};
