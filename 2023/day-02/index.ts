/**
 * XXXX - Day XX
 * https://adventofcode.com/XXXX/day/X
 */

import { getInput } from '../../utils/get_input';

type Input = string[][];
type Filename = 'input' | 'input.test';
type Colors = 'blue' | 'red' | 'green';

const YEAR = 2023;
const DAY = 2;

const format = async (filename: Filename): Promise<Input> => {
  const input = await getInput<Filename>(YEAR, DAY, filename);
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map((line) => line.split(': ')[1].match(/(\d+) (red|green|blue)/g) as string[]);
};

/**
 * Part 1
 */
const part1 = (input: Input) => {
  const limits: Record<Colors, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let possibleGames = (input.length * (input.length + 1)) / 2;

  for (let i = 0; i < input.length; i++) {
    const records = input[i];

    for (const record of records) {
      const [ID, color] = record.split(' ');
      if (Number(ID) > limits[color as Colors]) {
        possibleGames -= i + 1;
        break;
      }
    }
  }

  return possibleGames;
};

/**
 * Part 2
 */
const part2 = (input: Input) => {
  let powerSum = 0;

  for (const records of input) {
    const minimums: Record<Colors, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const record of records) {
      const [ID, color] = record.split(' ');
      minimums[color as Colors] = Math.max(minimums[color as Colors], Number(ID));
    }

    powerSum += minimums.red * minimums.green * minimums.blue;
  }

  return powerSum;
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
