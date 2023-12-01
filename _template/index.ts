/**
 * XXXX - Day XX
 * https://adventofcode.com/XXXX/day/X
 */

import { getInput } from '../utils/get_input';

export type Input = string[];
export type Filename = 'input' | 'input.test' | 'input2.test';

const YEAR = 2023;
const DAY = 0;

const format = async (filename: Filename): Promise<Input> => {
  const input = await getInput<Filename>(YEAR, DAY, filename);
  return input.replace(/\r/g, '').trim().split('\n');
};

/**
 * Part 1
 */
export const part1 = (input: Input) => {
  return input;
};

/**
 * Part 2
 */
export const part2 = (input: Input) => {
  return input;
};

const logParts = async () => {
  const testInput = await format('input.test');
  const finalInput = await format('input');

  console.table({
    'Part 1 (test)': part1(testInput),
    'Part 1 (final)': part1(finalInput),
    'Part 2 (test)': part2(testInput),
    'Part 2 (final)': part2(finalInput),
  });
};

void logParts();
