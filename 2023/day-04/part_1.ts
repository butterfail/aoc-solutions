import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 13];

const format = (input: string): string[] => {
  return input.replace(/\r/g, '').trim().split('\n');
};

const formatCard = (str: string): number[] => {
  return str
    .trim()
    .split(' ')
    .map(Number)
    .filter((num) => num !== 0 && !Number.isNaN(num));
};

const calculatePointsForCard = (card: string): number => {
  const [winningNumbersStr, yourNumbersStr] = card.split('|');
  const winningNumbers = formatCard(winningNumbersStr);
  const yourNumbers = formatCard(yourNumbersStr);

  return yourNumbers.reduce(
    (points, num) => (winningNumbers.includes(num) ? (points === 0 ? 1 : points * 2) : points),
    0,
  );
};

export const solve = (input: string) => {
  const cards = format(input);
  return cards.reduce((totalPoints, card) => totalPoints + calculatePointsForCard(card), 0);
};
