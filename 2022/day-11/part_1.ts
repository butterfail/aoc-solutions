import fs from 'node:fs';

type Monkey = {
  id: number;
  totalInspectedObjects: number;
  items: number[];
  divisibleBy: number;
  operation: (old: string) => any;
  sendTo: (item: number) => number;
};

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 10605];

function getOperationFunction(input: string) {
  return function (old: string) {
    const string = input.replace(/old/, old);
    // eslint-disable-next-line no-eval
    return eval(string);
  };
}

const format = (input: string): Monkey[] => {
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n\n')
    .map((lines, monkeyId) => {
      const items = lines
        .match(/Starting items(?:[:,] (\d+))+/g)![0]
        .split(': ')[1]
        .split(', ')
        .map(Number);
      const operation = lines.match(/= ([^\n]+)/)![1];

      const divisibleBy = Number(lines.match(/divisible by (\d+)/)![1]);
      const whenTrueSendTo = Number(lines.match(/If true: throw to monkey (\d)/)![1]);
      const whenFalseSendTo = Number(lines.match(/If false: throw to monkey (\d)/)![1]);

      return {
        id: monkeyId,
        totalInspectedObjects: 0,
        items,
        divisibleBy,
        operation: getOperationFunction(operation),
        sendTo: (item: number) => (item % divisibleBy === 0 ? whenTrueSendTo : whenFalseSendTo),
      };
    });
};

export const solve = (input: string) => {
  const monkeys = format(input);

  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      const items = monkey.items;

      while (items.length) {
        let item = items.shift();
        monkey.totalInspectedObjects++;

        item = monkey.operation(item!.toString());
        item = Math.floor(item! / 3);
        const destination = monkey.sendTo(item);

        monkeys[destination].items.push(item);
      }
    }
  }

  const activity = monkeys.map((m) => m.totalInspectedObjects);
  activity.sort((a, b) => b - a);
  return activity[0] * activity[1];
};
