/* eslint-disable no-constant-condition */
import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 6];

type Instructions = string[];
type Nodes = { [key: string]: [string, string] };

const format = (input: string): { instructions: Instructions; nodes: Nodes } => {
  const lines = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const instructions = lines[0].split('');
  const nodes: Nodes = {};

  for (const line of lines.slice(1)) {
    const splitLine = line.split(' = ');
    if (splitLine.length === 2) {
      const [node, rest] = splitLine;
      const [left, right] = rest.slice(1, -1).split(', ');
      nodes[node] = [left, right];
    }
  }

  return { instructions, nodes };
};

export const solve = (input: string) => {
  const { instructions, nodes } = format(input);

  let curNode = 'AAA';
  let steps = 0;
  let i = 0;

  while (true) {
    steps++;
    const [left, right] = nodes[curNode];
    curNode = instructions[i] === 'L' ? left : right;
    i = (i + 1) % instructions.length;
    if (curNode === 'ZZZ') {
      break;
    }
  }

  return steps;
};
