import fs from 'node:fs';

type Program = {
  op: string;
  value: number;
};

const testInput = fs.readFileSync(new URL('./part_2.test', import.meta.url), 'utf-8');
export const testCase = [
  testInput,
  `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`,
];

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

class CRT {
  width: number;
  height: number;
  currentIndex: number;
  content: string[][];

  constructor(width = 40, height = 6) {
    this.width = width;
    this.height = height;
    this.currentIndex = 0;
    this.content = new Array(this.height).fill(0).map(() => new Array(this.width).fill(' '));
  }

  runCycle(spritePosition: number) {
    const x = this.currentIndex % this.width;
    const y = Math.floor(this.currentIndex / this.width);

    if (y >= this.height) {
      return;
    }

    if (Math.abs(x - spritePosition) < 2) {
      this.content[y][x] = '#';
    } else {
      this.content[y][x] = '.';
    }

    this.currentIndex++;
  }

  printScreen() {
    return this.content.map((line) => line.join('')).join('\n');
  }
}

export const solve = (input: string) => {
  const program = format(input);
  const cpu = new CPU(program);
  const crt = new CRT();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    crt.runCycle(cpu.registers.X);
    if (!cpu.runCycle()) {
      break;
    }
  }
  return crt.printScreen();
};
