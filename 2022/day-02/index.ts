/**
 * 2022 - Day 02
 * https://adventofcode.com/2022/day/2
 */

import fs from 'node:fs'
import path from 'node:path'

console.clear()

export type Input = {
  opponent: string
  player: string
}[]
export type Filename = 'input' | 'input.test'

const format = (filename: Filename): Input => {
  return fs
    .readFileSync(path.resolve(__dirname, filename), 'utf8')
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map(line => {
      const [opponent, player] = line.split(' ')
      return { opponent, player }
    })
}

enum shape {
  rock = 1,
  paper = 2,
  scissors = 3
}

const calculateScore = (opponent: number, player: number): number => {
  if (opponent === player) {
    return player + 3
  }

  if (
    (opponent === shape.rock && player === shape.paper) ||
    (opponent === shape.paper && player === shape.scissors) ||
    (opponent === shape.scissors && player === shape.rock)
  ) {
    return player + 6
  }

  return player
}

/**
 * Part 1
 */
enum mapInput {
  // Opponent
  'A' = shape.rock,
  'B' = shape.paper,
  'C' = shape.scissors,
  // Player
  'X' = shape.rock,
  'Y' = shape.paper,
  'Z' = shape.scissors
}

export const part1 = (input: Input) => {
  const scores = input.map(line => {
    const opponentShape = Number(mapInput[line.opponent])
    const playerShape = Number(mapInput[line.player])
    return calculateScore(opponentShape, playerShape)
  })

  return scores.reduce((acc, value) => acc + value, 0)
}
console.log('Part 1', part1(format('input')))

/**
 * Part 2
 */
const solutions = {
  A: {
    // rock
    X: shape.scissors, // lose
    Y: shape.rock, // draw
    Z: shape.paper // win
  },
  B: {
    // paper
    X: shape.rock,
    Y: shape.paper,
    Z: shape.scissors
  },
  C: {
    // scissors
    X: shape.paper,
    Y: shape.scissors,
    Z: shape.rock
  }
}

export const part2 = (input: Input) => {
  const scores = input.map(line => {
    const opponentShape = Number(mapInput[line.opponent])
    const playerShape = Number(solutions[line.opponent][line.player])
    return calculateScore(opponentShape, playerShape)
  })

  return scores.reduce((acc, value) => acc + value, 0)
}
console.log('Part 2', part2(format('input')))
