/**
 * 2023 - Day 03
 * https://adventofcode.com/2023/day/3
 */

import { getInput } from '../../utils/get_input';

type Input = string[];
type Filename = 'input' | 'input.test';
type Board = Input;
type GearNumbers = Map<string, number[]>;

const YEAR = 2023;
const DAY = 3;

const format = async (filename: Filename): Promise<Input> => {
  const input = await getInput<Filename>(YEAR, DAY, filename);
  return input.replace(/\r/g, '').trim().split('\n');
};

const numPattern = /\d+/g;

function considerNumberNeighbors(
  board: Board,
  gearNumbers: GearNumbers,
  startY: number,
  startX: number,
  endY: number,
  endX: number,
  num: number,
): boolean {
  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      if (y < board.length && x < board[y].length) {
        const char = board[y][x];

        if (!char.match(/\d/) && char !== '.') {
          if (char === '*') {
            const key = `${y},${x}`;

            if (!gearNumbers.has(key)) {
              gearNumbers.set(key, []);
            }

            gearNumbers.get(key)!.push(num);
          }

          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Part 1
 */
const part1 = (input: Input) => {
  const gearNumbers: GearNumbers = new Map();
  let total = 0;

  input.forEach((line, rowNumber) => {
    let match: RegExpExecArray | null;
    while ((match = numPattern.exec(line)) !== null) {
      const num = Number(match[0]);

      if (
        considerNumberNeighbors(
          input,
          gearNumbers,
          Math.max(0, rowNumber - 1),
          Math.max(0, match.index - 1),
          rowNumber + 1,
          match.index + match[0].length,
          num,
        )
      ) {
        total += num;
      }
    }
  });

  return total;
};

/**
 * Part 2
 */
const part2 = (input: Input) => {
  const gearNumbers: GearNumbers = new Map();
  let ratioTotal = 0;

  input.forEach((line, rowNumber) => {
    let match: RegExpExecArray | null;
    while ((match = numPattern.exec(line)) !== null) {
      const num = Number(match[0]);

      considerNumberNeighbors(
        input,
        gearNumbers,
        Math.max(0, rowNumber - 1),
        Math.max(0, match.index - 1),
        rowNumber + 1,
        match.index + match[0].length,
        num,
      );
    }
  });

  gearNumbers.forEach((values) => {
    if (values.length === 2) {
      ratioTotal += values[0] * values[1];
    }
  });

  return ratioTotal;
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
