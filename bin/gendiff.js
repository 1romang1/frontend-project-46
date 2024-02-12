#!/usr/bin/env node
import * as fs from 'node:fs';
import { Command } from 'commander';

const jsonParse = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const genDiff = (filePath1, filePath2) => {
  const obj1 = jsonParse(filePath1);
  const obj2 = jsonParse(filePath2);
  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();

  const result = [];

  keys1.forEach((key) => {
    if (Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        result.push(`  ${key}: ${obj1[key]}`);
      } else {
        result.push(`- ${key}: ${obj1[key]}`);
        result.push(`+ ${key}: ${obj2[key]}`);
      }
    } else {
      result.push(`- ${key}: ${obj1[key]}`);
    }
  });

  keys2.forEach((key) => {
    if (!Object.hasOwn(obj1, key)) {
      result.push(`+ ${key}: ${obj2[key]}`);
    }
  });
  return result.join('\n');
};

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  });
program.parse();

export default genDiff;
