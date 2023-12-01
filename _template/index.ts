/**
 * XXXX - Day XX
 * https://adventofcode.com/XXXX/day/X
 */

import fs from 'node:fs';
import path from 'node:path';

console.clear();

export type Input = any;
export type Filename = 'input' | 'input.test';

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
  return input;
};
console.table({
  'Part 1 (test)': part1(format('input.test')),
  'Part 1 (final)': part1(format('input')),
});

/**
 * Part 2
 */
export const part2 = (input: Input) => {
  return input;
};
console.table({
  'Part 2 (test)': part2(format('input.test')),
  'Part 2 (final)': part2(format('input')),
});
