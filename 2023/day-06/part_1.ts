import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 288];

const format = (input: string): number[][] => {
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map((l) =>
      l
        .trim()
        .split(/\s+/)
        .map((n) => +n.trim())
        .filter((n) => !!n),
    );
};

export const solve = (input: string) => {
  const [times, distances] = format(input);
  return times.reduce((acc, time, i) => {
    const sqrt = Math.sqrt(Math.pow(time, 2) - 4 * distances[i]);
    const ib = Math.ceil((time + sqrt) / 2) - Math.floor((time - sqrt) / 2) - 1;
    return acc * ib;
  }, 1);
};
