/**
 * 2022 - Day 03
 * https://adventofcode.com/2022/day/3
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
    .split('\n');
};

function letterToPriority(letter: string) {
  if (/[a-z]/.test(letter)) {
    return letter.charCodeAt(0) - ('a'.charCodeAt(0) - 1);
  } else {
    return letter.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
  }
}

/**
 * Part 1
 */
export const part1 = (input: Input) => {
  const rucksack = input.map((line) => {
    const left = [...line.slice(0, line.length / 2)];
    const right = [...line.slice(line.length / 2)];

    const leftSet = new Set(left);
    const intersection = right.filter((x) => leftSet.has(x));
    const duplicateLetter = [...new Set(intersection)][0];

    return letterToPriority(duplicateLetter);
  });
  return rucksack.reduce((value, acc) => value + acc, 0);
};
console.log('Part 1', part1(format('input')));

/**
 * Part 2
 */
export const part2 = (input: Input) => {
  let sum = 0;

  for (let i = 0; i < input.length; i += 3) {
    const backpacks = [[...input[i]], [...input[i + 1]], [...input[i + 2]]];

    const set1 = new Set(backpacks[0]);
    const intersection1 = backpacks[1].filter((x) => set1.has(x));

    const set2 = new Set(intersection1);
    const intersection2 = backpacks[2].filter((x) => set2.has(x));

    const duplicateLetter = [...new Set(intersection2)][0];

    sum += letterToPriority(duplicateLetter);
  }

  return sum;
};
console.log('Part 2', part2(format('input')));
