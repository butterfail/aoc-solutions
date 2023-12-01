/**
 * 2022 - Day 02
 * https://adventofcode.com/2022/day/2
 */

import fs from 'node:fs';
import path from 'node:path';
import { _dirname } from 'utils/dirname';

console.clear();

export type Input = {
  opponent: string;
  player: string;
}[];
export type Filename = 'input' | 'input.test';

const format = (filename: Filename): Input => {
  return fs
    .readFileSync(path.resolve(_dirname, filename), 'utf8')
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map((line) => {
      const [opponent, player] = line.split(' ');
      return { opponent, player };
    });
};

enum Shape {
  rock = 1,
  paper = 2,
  scissors = 3,
}

const calculateScore = (opponent: number, player: number): number => {
  if (opponent === player) {
    return player + 3;
  }

  if (
    (opponent === Shape.rock && player === Shape.paper) ||
    (opponent === Shape.paper && player === Shape.scissors) ||
    (opponent === Shape.scissors && player === Shape.rock)
  ) {
    return player + 6;
  }

  return player;
};

/**
 * Part 1
 */
enum MapInput {
  // Opponent
  'A' = Shape.rock,
  'B' = Shape.paper,
  'C' = Shape.scissors,
  // Player
  'X' = Shape.rock,
  'Y' = Shape.paper,
  'Z' = Shape.scissors,
}

export const part1 = (input: Input) => {
  const scores = input.map((line) => {
    const opponentShape = Number(MapInput[line.opponent]);
    const playerShape = Number(MapInput[line.player]);
    return calculateScore(opponentShape, playerShape);
  });

  return scores.reduce((acc, value) => acc + value, 0);
};
console.log('Part 1', part1(format('input')));

/**
 * Part 2
 */
const solutions = {
  A: {
    // rock
    X: Shape.scissors, // lose
    Y: Shape.rock, // draw
    Z: Shape.paper, // win
  },
  B: {
    // paper
    X: Shape.rock,
    Y: Shape.paper,
    Z: Shape.scissors,
  },
  C: {
    // scissors
    X: Shape.paper,
    Y: Shape.scissors,
    Z: Shape.rock,
  },
};

export const part2 = (input: Input) => {
  const scores = input.map((line) => {
    const opponentShape = Number(MapInput[line.opponent]);
    const playerShape = Number(solutions[line.opponent][line.player]);
    return calculateScore(opponentShape, playerShape);
  });

  return scores.reduce((acc, value) => acc + value, 0);
};
console.log('Part 2', part2(format('input')));
