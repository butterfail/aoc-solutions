import path from 'node:path';
import process from 'node:process';
import fs from 'node:fs';
import readline from 'node:readline/promises';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { getInput } from './utils/get_input';
import { logger } from './utils/logger';
import { AnswerState, submitAnswer } from './utils/submit_answer';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
process.on('exit', () => rl.close());

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  logger.info(
    `Usage:
  pnpm aoc ${chalk.yellow('[year]')} ${chalk.yellow('[day]')}
  day and year are optional. If not provided, the current day and year will be used.`,
  );
  process.exit(0);
}

const now = new Date();
const year = args[0] ?? now.getFullYear().toString();
const day = (args[1] ?? now.getDate()).toString().padStart(2, '0');

logger.info(chalk.bold.underline(`--- Advent of Code ${year} - Day ${day} ---\n`));

const parts = {
  'Part 1': 'part_1.ts',
  'Part 2': 'part_2.ts',
};

for (const [partName, fileName] of Object.entries(parts)) {
  const basePath = `./${year}/day-${day}`;
  const filePath = path.resolve(`${basePath}/${fileName}`);

  if (!fs.existsSync(filePath)) {
    // eslint-disable-next-line @typescript-eslint/quotes
    logger.error("Couldn't find file " + chalk.underline(`${basePath}/${fileName}`));
    process.exit();
  }

  logger.info(`--- ${partName} ---`);

  const { solve, testCase } = await import(filePath);

  logger.info('--- Test ---');
  const [testInput, expected] = testCase;
  const outputTest = solve(testInput);
  if (outputTest !== expected) {
    logger(chalk.red(`Test failed.\n${chalk.green(`Expected: ${expected}`)}\nGot: ${outputTest}`));
    process.exit();
  }
  logger.success('Test passed!\n');

  const input = await getInput(year, day);
  const output = solve(input);
  logger.info('--- Output ---');
  logger.success(output + '\n');

  const answerQuestion = await rl.question(
    '❔ ' + chalk.magenta('Submit answer? ' + chalk.yellow('(y/n)')),
  );
  if (answerQuestion.trim().toLowerCase() === 'y' || answerQuestion.trim() === '') {
    logger.chore('Submitting answer');
    const answer = await submitAnswer(output, year, day, partName.at(-1)!);
    if (answer !== AnswerState.Correct && answer !== AnswerState.AlreadySubmitted) {
      process.exit();
    }
  }

  const nextPart = Object.entries(parts).find((part) => part[1] !== fileName)?.[1];
  if (!nextPart) {
    logger.error('No more parts to run, exiting.');
    process.exit();
  }

  const nextPartPath = path.resolve(`${basePath}/${nextPart}`);
  if (!fs.existsSync(nextPartPath)) {
    logger.chore('Creating part 2 file.');
    const partTemplate = fs.readFileSync(filePath, 'utf-8');
    fs.writeFileSync(nextPartPath, partTemplate.replace(/part_1/g, 'part_2'));
    fs.copyFileSync(
      path.resolve(`./${year}/day-${day}/part_1.test`),
      path.resolve(`./${year}/day-${day}/part_2.test`),
    );
    logger.success('Part 2 file created.');
    process.exit();
  }
}

process.exit();
