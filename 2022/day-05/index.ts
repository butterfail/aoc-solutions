/**
 * XXXX - Day XX
 * https://adventofcode.com/XXXX/day/X
 */

import fs from 'node:fs';
import path from 'node:path';
import { _dirname } from 'utils/dirname';

console.clear();

export type Input = {
  indexes: string[];
  stacks: Record<string, string[]>;
  moves: {
    count: number;
    from: number;
    to: number;
  }[];
};
export type Filename = 'input' | 'input.test';

const format = (filename: Filename): Input => {
  const [rawStacks, rawMoves] = fs
    .readFileSync(path.resolve(_dirname, filename), 'utf8')
    .replace(/\r/g, '')
    .trimEnd()
    .split('\n\n')
    .map((x) => x.split('\n'));

  const parsedStacks = rawStacks.map((line) => [...line].filter((_, idx) => idx % 4 === 1));

  const indexes = parsedStacks.pop()!;

  const stacks = {};
  for (const line of parsedStacks) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== ' ') {
        // Add line[i] to the stack indexes[i]
        if (!stacks[indexes[i]]) {
          stacks[indexes[i]] = [];
        }

        stacks[indexes[i]].unshift(line[i]);
      }
    }
  }

  const moves: Input['moves'] = [];
  for (const move of rawMoves) {
    const match = /move (\d+) from (\d+) to (\d+)/g.exec(move);
    moves.push({
      count: Number(match![1]),
      from: Number(match![2]),
      to: Number(match![3]),
    });
  }

  return { indexes, stacks, moves };
};

/**
 * Part 1
 */
export const part1 = ({ stacks, moves, indexes }: Input) => {
  const stacksCloned = { ...stacks };

  for (const move of moves) {
    for (let i = 0; i < move.count; i++) {
      const crate = stacksCloned[move.from].pop();
      stacksCloned[move.to].push(crate!);
    }
  }

  return indexes
    .map((value) => {
      const stack = stacksCloned[value];
      return stack[stack.length - 1];
    })
    .join('');
};
console.log('Part 1', part1(format('input')));

/**
 * Part 2
 */
export const part2 = ({ stacks, moves, indexes }: Input) => {
  const stacksCloned = { ...stacks };

  for (const move of moves) {
    const crates = stacksCloned[move.from].splice(-move.count, move.count);
    stacksCloned[move.to] = stacksCloned[move.to].concat(crates);
  }

  return indexes
    .map((value) => {
      const stack = stacksCloned[value];
      return stack[stack.length - 1];
    })
    .join('');
};
console.log('Part 2', part2(format('input')));
