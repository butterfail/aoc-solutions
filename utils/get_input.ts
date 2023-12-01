import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

export const getInput = async <T extends string>(
  year: number,
  day: number | string,
  filename: T,
): Promise<string> => {
  const { AOC_SESSION_COOKIE } = process.env;
  if (!AOC_SESSION_COOKIE) {
    throw new Error('AOC_SESSION_COOKIE is not defined');
  }

  const filePath = path.resolve(`./${year}/day-${day}/${filename}`);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }

  console.log(`Input not found for day ${day} ${year}, downloading`);

  const url = `https://adventofcode.com/${year}/day/${+day}/input`;
  const res = await fetch(url, {
    headers: { cookie: `session=${AOC_SESSION_COOKIE}` },
  });

  if (res.status !== 200) {
    throw new Error(`Fetching "${url}" failed with status ${res.status}:\n${await res.text()}`);
  }

  const text = await res.text();
  const input = text.trim();

  fs.writeFileSync(filePath, input);

  return input;
};
