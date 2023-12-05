/* eslint-disable prefer-const */
import fs from 'node:fs';

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 35];

const format = (input: string): string[] => {
  return input.replace(/\r/g, '').trim().split('\n');
};

interface MappingRange {
  destStart: number;
  sourceStart: number;
  length: number;
}

const parseRanges = (lines: string[], startIndex: number): [MappingRange[], number] => {
  let ranges: MappingRange[] = [];
  let index = startIndex;
  while (index < lines.length && lines[index].trim() !== '') {
    const [destStart, sourceStart, length] = lines[index].split(' ').map(Number);
    ranges.push({ destStart, sourceStart, length });
    index++;
  }
  return [ranges, index];
};

const mapNumber = (num: number, ranges: MappingRange[]): number => {
  for (let range of ranges) {
    if (num >= range.sourceStart && num < range.sourceStart + range.length) {
      return range.destStart + (num - range.sourceStart);
    }
  }
  return num;
};

export const solve = (input: string) => {
  const lines = format(input);
  const seeds = lines[0].split(': ')[1].split(' ').map(Number);

  let index = 1;
  let seedToSoilRanges;
  let soilToFertilizerRanges;
  let fertilizerToWaterRanges;
  let waterToLightRanges;
  let lightToTemperatureRanges;
  let temperatureToHumidityRanges;
  let humidityToLocationRanges;

  [seedToSoilRanges, index] = parseRanges(lines, index + 1);
  [soilToFertilizerRanges, index] = parseRanges(lines, index + 1);
  [fertilizerToWaterRanges, index] = parseRanges(lines, index + 1);
  [waterToLightRanges, index] = parseRanges(lines, index + 1);
  [lightToTemperatureRanges, index] = parseRanges(lines, index + 1);
  [temperatureToHumidityRanges, index] = parseRanges(lines, index + 1);
  [humidityToLocationRanges, index] = parseRanges(lines, index + 1);

  const locationNumbers = seeds.map((seed) => {
    let num = seed;
    num = mapNumber(num, seedToSoilRanges);
    num = mapNumber(num, soilToFertilizerRanges);
    num = mapNumber(num, fertilizerToWaterRanges);
    num = mapNumber(num, waterToLightRanges);
    num = mapNumber(num, lightToTemperatureRanges);
    num = mapNumber(num, temperatureToHumidityRanges);
    num = mapNumber(num, humidityToLocationRanges);
    return num;
  });

  return Math.min(...locationNumbers);
};
