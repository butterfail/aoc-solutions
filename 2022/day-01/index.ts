/**
 * 2022 - Day 01
 * https://adventofcode.com/2022/day/1
 */

import fs from 'node:fs';
import path from 'node:path';

console.clear();

export type Input = number[][];
export type Filename = 'input' | 'input.test';

const format = (filename: Filename): Input => {
  return fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .replace(/\r/g, '')
    .trim()
    .split('\n\n')
    .map((x) => x.split('\n').map(Number));
};

/**
 * Part 1
 */
export const part1 = (input: Input) => {
  const caloriesSum = input.map((calories) => calories.reduce((acc, value) => acc + value, 0));
  return Math.max(...caloriesSum);
};
console.log('Part 1', part1(format('input')));

/**
 * Part 2
 */
export const part2 = (input: Input) => {
  return input
    .map((calories) => calories.reduce((acc, value) => acc + value, 0))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, value) => acc + value, 0);
};
console.log('Part 2', part2(format('input')));
