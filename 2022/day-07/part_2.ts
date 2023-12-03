import fs from 'node:fs';

type Callback = (...args: any) => void;

interface FileSystemNode {
  name: string;
  isDirectory: boolean;
  parent?: Directory;
}

interface Directory extends FileSystemNode {
  children: Array<Directory | File>;
}

interface File extends FileSystemNode {
  size: number;
}

const testInput = fs.readFileSync(new URL('./part_2.test', import.meta.url), 'utf-8');
export const testCase = [testInput, 24933642];

const format = (input: string): Array<string> => {
  return input.replace(/\r/g, '').trim().split('\n');
};

const parseCommand = (line: string): { command: string; argument?: string } => {
  const cmdMatch = /^\$ (?<command>\w+)(?: (?<argument>.+))?$/.exec(line);
  if (!cmdMatch || !cmdMatch.groups) {
    throw new Error(`Could not parse command: ${line}`);
  }
  return { command: cmdMatch.groups.command, argument: cmdMatch.groups.argument };
};

const createTree = (lines: Array<string>): Directory => {
  const root: Directory = {
    name: '/',
    isDirectory: true,
    children: [],
  };

  let currentNode: Directory | File = root;
  let currentCommand = '';

  for (const line of lines) {
    if (line.startsWith('$')) {
      const { command, argument } = parseCommand(line);

      currentCommand = command;

      if (currentCommand === 'cd') {
        const target = argument;
        if (target === '/') {
          currentNode = root;
        } else if (target === '..') {
          currentNode = currentNode.parent!;
        } else {
          if ('children' in currentNode) {
            currentNode = currentNode.children.find(
              (child) => child.isDirectory && child.name === target,
            )!;
          }
        }
      }
    } else {
      if (currentCommand === 'ls') {
        const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line);
        if (fileMatch && 'children' in currentNode) {
          if (!fileMatch.groups) {
            throw new Error(`Could not parse file: ${line}`);
          }

          currentNode.children.push({
            name: fileMatch.groups.name,
            isDirectory: false,
            size: Number(fileMatch.groups.size),
            parent: currentNode,
          });
        }

        const dirMatch = /^dir (?<name>.+)$/.exec(line);
        if (dirMatch && 'children' in currentNode) {
          if (!dirMatch.groups) {
            throw new Error(`Could not parse directory: ${line}`);
          }

          currentNode.children.push({
            name: dirMatch.groups.name,
            isDirectory: true,
            children: [],
            parent: currentNode,
          });
        }
      }
    }
  }

  return root;
};

const getSize = (node: Directory | File, callback: Callback) => {
  if (!node.isDirectory && 'size' in node) {
    return node.size ?? 0;
  }

  let directorySize = 0;
  if ('children' in node) {
    directorySize = node.children
      .map((child: Directory | File) => getSize(child, callback))
      .reduce((a: number, b: number) => a + b, 0);
  }

  callback(directorySize);
  return directorySize;
};

export const solve = (input: string) => {
  const lines = format(input);
  const totalDiskSpace = 70_000_000;
  const requiredSpace = 30_000_000;
  const tree = createTree(lines);
  const usedSpace = getSize(tree, () => {});
  const availableSpace = totalDiskSpace - usedSpace;
  const minimumSpace = requiredSpace - availableSpace;
  const candidates: Array<number> = [];

  getSize(tree, (size: number) => {
    if (size >= minimumSpace) {
      candidates.push(size);
    }
  });

  candidates.sort((a, b) => a - b);
  return candidates[0];
};
