/**
 * 2023 - Day 01
 * https://adventofcode.com/2023/day/1
 */

import fs from 'node:fs';
import path from 'node:path';

console.clear();

export type Input = string[];
export type Filename = 'input' | 'input.test' | 'input2.test';

const format = (filename: Filename): Input => {
  return fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .replace(/\r/g, '')
    .trim()
    .split('\n');
};

/**
 * Part 1
 */
export const part1 = (input: Input) => {
  return input
    .map((line) => {
      const digits = line
        .split('')
        .map(Number)
        .filter((n) => !Number.isNaN(n));

      return Number(`${digits[0]}${digits[digits.length - 1]}`);
    })
    .reduce((acc, value) => acc + value, 0);
};
console.table({
  'Part 1 (test)': part1(format('input.test')),
  'Part 1 (final)': part1(format('input')),
});

/**
 * Part 2
 */
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

export const part2 = (input: Input) => {
  return input
    .map((line) => {
      const digits = line
        .split('')
        .map((_, i) => convertWordToNumber(line.slice(i)))
        .filter((n) => !Number.isNaN(n));

      return Number(`${digits[0]}${digits[digits.length - 1]}`);
    })
    .reduce((acc, value) => acc + value, 0);
};
console.table({
  'Part 2 (test)': part2(format('input2.test')),
  'Part 2 (final)': part2(format('input')),
});
