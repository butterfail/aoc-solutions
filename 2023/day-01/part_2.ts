import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_2.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 281];

const format = (input: string): string[] => {
  return input.replace(/\r/g, '').trim().split('\n');
};

const stringToNumberMap: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const convertWordToNumber = (str: string): number => {
  for (const key in stringToNumberMap) {
    if (str.startsWith(key)) {
      return stringToNumberMap[key];
    }
  }
  return Number.parseInt(str.charAt(0));
};

export const solve = (input: string) => {
  return format(input)
    .map((line) => {
      const digits = line
        .split('')
        .map((_, i) => convertWordToNumber(line.slice(i)))
        .filter((n) => !Number.isNaN(n));

      return Number(`${digits[0]}${digits[digits.length - 1]}`);
    })
    .reduce((acc, value) => acc + value, 0);
};
