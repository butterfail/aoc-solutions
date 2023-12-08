import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_2.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 5905];

const format = (input: string): string[][] => {
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map((l) => l.split(' '));
};

const strength = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
const letters = 'abcdefghijklmnopqrstuvwxyz';

export const solve = (input: string) => {
  const lines = format(input);
  const types = lines
    .map(([cards, bid]) => {
      const s = [...new Set(cards.split(''))]
        .map((c) => (c === 'J' ? 0 : cards.split('').filter((x) => x === c).length))
        .sort((a, b) => b - a)
        .map((c, i) => (i === 0 ? c + (cards.match(/J/g)?.length ?? 0) : c))
        .join('')
        .padEnd(5, '0');
      const p = cards
        .split('')
        .map((c) => letters[strength.indexOf(c)])
        .join('');
      return { s, c: cards, b: Number(bid), p };
    })
    .sort((a, b) => b.p.localeCompare(a.p))
    .sort((a, b) => a.s.localeCompare(b.s))
    .map((x, i) => ({ ...x, r: i + 1 }));
  return types.reduce((acc, v) => acc + v.b * v.r, 0);
};
