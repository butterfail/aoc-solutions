import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_2.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 30];

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

const countMatches = (card: string): number => {
  const [winningNumbersStr, yourNumbersStr] = card.split('|');
  const winningNumbers = formatCard(winningNumbersStr);
  const yourNumbers = formatCard(yourNumbersStr);
  return yourNumbers.filter((num) => winningNumbers.includes(num)).length;
};

export const solve = (input: string) => {
  const cards = format(input);
  const cardCopies = new Array(cards.length).fill(1);

  const totalCards = cards.reduce((acc, card, i) => {
    const matches = countMatches(card);
    for (let j = i + 1; j <= i + matches && j < cards.length; j++) {
      cardCopies[j] += cardCopies[i];
      acc += cardCopies[i];
    }
    return acc;
  }, cards.length);

  return totalCards;
};
