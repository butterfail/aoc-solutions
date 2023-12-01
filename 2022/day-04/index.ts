/**
 * 2022 - Day 04
 * https://adventofcode.com/2022/day/4
 */

import fs from 'node:fs';
import path from 'node:path';

console.clear();

export type Input = string[];
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
  return input
    .map((line) => {
      const [interval1, interval2] = line
        .split(',')
        .map((interval) => interval.split('-').map(Number))
        .sort((a, b) => {
          const oneSize = a[1] - a[0];
          const twoSize = b[1] - b[0];
          return twoSize - oneSize;
        });

      const oneFullContainsTwo = interval1[0] <= interval2[0] && interval1[1] >= interval2[1];

      return oneFullContainsTwo ? 1 : 0;
    })
    .reduce((acc: number, value: number) => acc + value, 0);
};
console.log('Part 1', part1(format('input.test')));

/**
 * Part 2
 */
export const part2 = (input: Input) => {
  return input
    .map((line) => {
      const [interval1, interval2] = line
        .split(',')
        .map((interval) => interval.split('-').map(Number))
        .sort((a, b) => {
          const oneSize = a[1] - a[0];
          const twoSize = b[1] - b[0];
          return twoSize - oneSize;
        });

      const isOverlapping = interval1[1] >= interval2[0] && interval1[1] >= interval2[0];

      return isOverlapping ? 1 : 0;
    })
    .reduce((acc: number, value: number) => acc + value, 0);
};
console.log('Part 2', part2(format('input.test')));
