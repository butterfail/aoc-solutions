/* eslint-disable no-constant-condition */
import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_2.test', import.meta.url), 'utf-8');
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

function lcm(numbers: number[]): number {
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const lcmTwoNumbers = (a: number, b: number): number => {
    return Math.abs(a * b) / gcd(a, b);
  };

  return numbers.reduce((acc, val) => lcmTwoNumbers(acc, val), 1);
}

export const solve = (input: string) => {
  const { instructions, nodes } = format(input);
  const curNodes = Object.keys(nodes).filter((node) => node.endsWith('A'));
  const lcmSet = new Set<number>();

  for (let curNode of curNodes) {
    let steps = 0;
    let i = 0;

    while (true) {
      steps++;
      const [left, right] = nodes[curNode];
      curNode = instructions[i] === 'L' ? left : right;
      i = (i + 1) % instructions.length;
      if (curNode.endsWith('Z')) {
        lcmSet.add(steps);
        break;
      }
    }
  }

  return lcm([...lcmSet]);
};
