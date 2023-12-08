import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 6440];

const format = (input: string): string[][] => {
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map((l) => l.split(' '));
};

const strength = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const letters = 'abcdefghijklmnopqrstuvwxyz';

export const solve = (input: string) => {
  const lines = format(input);
  const types = lines
    .map(([cards, bid]) => {
      const same = [...new Set(cards.split(''))]
        .map((c) => cards.split('').filter((x) => x === c).length)
        .sort((a, b) => b - a)
        .join('');
      const cardsPoints = cards
        .split('')
        .map((c) => letters[strength.indexOf(c)])
        .join('');
      return { same, cards, bid: Number(bid), cardsPoints };
    })
    .sort((a, b) => b.cardsPoints.localeCompare(a.cardsPoints))
    .sort((a, b) => a.same.localeCompare(b.same))
    .map((x, i) => ({ ...x, rank: i + 1 }))
    .reduce((acc, v) => acc + v.bid * v.rank, 0);
  return types;
};
