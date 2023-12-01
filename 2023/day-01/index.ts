/**
 * 2023 - Day 01
 * https://adventofcode.com/2023/day/1
 */

import { getInput } from '../../utils/get_input';

type Input = string[];
type Filename = 'input' | 'input.test' | 'input2.test';

const YEAR = 2023;
const DAY = 1;

const format = async (filename: Filename): Promise<Input> => {
  const input = await getInput<Filename>(YEAR, DAY, filename);
  return input.replace(/\r/g, '').trim().split('\n');
};

/**
 * Part 1
 */
const part1 = (input: Input) => {
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

const part2 = (input: Input) => {
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

const logParts = async () => {
  const testInput = await format('input.test');
  const testInput2 = await format('input2.test');
  const finalInput = await format('input');

  console.table({
    'Part 1 (test)': part1(testInput),
    'Part 1 (final)': part1(finalInput),
    'Part 2 (test)': part2(testInput2),
    'Part 2 (final)': part2(finalInput),
  });
};

void logParts();
