import fs from 'node:fs';

type Move = {
  direction: string;
  totalMoves: number;
};

const testInput = fs.readFileSync(new URL('./part_2.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 36];

const format = (input: string): Move[] => {
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map((line) => {
      const [letter, number] = line.split(' ');
      return {
        direction: letter,
        totalMoves: Number(number),
      };
    });
};

const movesDefinition = {
  R: {
    x: 1,
    y: 0,
  },
  L: {
    x: -1,
    y: 0,
  },
  U: {
    x: 0,
    y: -1,
  },
  D: {
    x: 0,
    y: 1,
  },
};

class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}

  move(direction: string) {
    const moveDefinition = movesDefinition[direction];
    this.x += moveDefinition.x;
    this.y += moveDefinition.y;
  }

  follow(point: Point) {
    const distance = Math.max(Math.abs(this.x - point.x), Math.abs(this.y - point.y));
    if (distance > 1) {
      const directionX = point.x - this.x;
      const directionY = point.y - this.y;
      this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
      this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
    }
  }
}

export const solve = (input: string) => {
  const moves = format(input);
  const knots = new Array(10).fill(0).map(() => new Point(0, 0));
  const visited = new Set<string>();
  visited.add('0,0');

  for (const move of moves) {
    for (let i = 0; i < move.totalMoves; i++) {
      knots[0].move(move.direction);
      for (let knot = 1; knot < knots.length; knot++) {
        knots[knot].follow(knots[knot - 1]);
      }
      const tail = knots[knots.length - 1];
      visited.add(`${tail.x},${tail.y}`);
    }
  }

  return visited.size;
};
