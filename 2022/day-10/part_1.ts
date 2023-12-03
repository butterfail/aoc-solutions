import fs from 'node:fs';

type Program = {
  op: string;
  value: number;
};

const testInput = fs.readFileSync(new URL('./part_1.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 13140];

const format = (input: string): Program[] => {
  return input
    .replace(/\r/g, '')
    .trim()
    .split('\n')
    .map((line) => {
      const [instruction, arg] = line.split(' ');
      const res = {
        op: instruction,
        value: 0,
      };
      if (res.op === 'addx') {
        res.value = Number(arg);
      }
      return res;
    });
};

class CPU {
  program: Program[];
  currentLine: number;
  cycle: number;
  wait: number;
  registers: {
    X: number;
  };

  constructor(program: Program[]) {
    this.program = program;
    this.currentLine = 0;
    this.cycle = 1;
    this.wait = 0;
    this.registers = {
      X: 1,
    };
  }

  runCycle() {
    if (this.currentLine >= this.program.length) {
      return false;
    }

    this.cycle++;

    const line = this.program[this.currentLine];

    if (line.op === 'noop') {
      this.currentLine++;
    } else if (line.op === 'addx') {
      if (this.wait === 0) {
        this.wait = 1;
      } else {
        this.wait--;

        if (this.wait === 0) {
          this.registers.X += line.value;
          this.currentLine++;
        }
      }
    }

    return true;
  }
}

export const solve = (input: string) => {
  const program = format(input);
  const cpu = new CPU(program);

  let signalStrength = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!cpu.runCycle()) {
      break;
    }

    if (cpu.cycle % 40 === 20) {
      signalStrength += cpu.cycle * cpu.registers.X;
    }
  }

  return signalStrength;
};
