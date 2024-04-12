#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';
import parse from '../parsers.js';
import { stylish } from '../stylish.js';

const program = new Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    // const formater = options.format;
    console.log(genDiff(parse(filepath1), parse(filepath2), options.format));
  });
program.parse();
