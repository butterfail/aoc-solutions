/**
 * 2022 - Day 06
 * https://adventofcode.com/2022/day/6
 */

import fs from 'node:fs';
import path from 'node:path';
import { _dirname } from 'utils/dirname';

console.clear();

export type Input = string[];
export type Filename = 'input' | 'input.test';

const format = (filename: Filename): Input => {
  return fs
    .readFileSync(path.resolve(_dirname, filename), 'utf8')
    .replace(/\r/g, '')
    .trim()
    .split('');
};

function isUnique(array: string[]) {
  return new Set(array).size === array.length;
}

function getFirstStartOfPacketMarker(input: Input, sequenceLength = 4) {
  const siblings: string[] = [];

  for (let i = 0; i < input.length; i++) {
    siblings.push(input[i]);

    if (siblings.length > sequenceLength) {
      siblings.shift();
    }

    if (siblings.length === sequenceLength && isUnique(siblings)) {
      return i + 1;
    }
  }

  return 0;
}

/**
 * Part 1
 */
export const part1 = (input: Input) => {
  return getFirstStartOfPacketMarker(input);
};
console.log('Part 1', part1(format('input')));

/**
 * Part 2
 */
export const part2 = (input: Input) => {
  return getFirstStartOfPacketMarker(input, 14);
};
console.log('Part 2', part2(format('input')));
