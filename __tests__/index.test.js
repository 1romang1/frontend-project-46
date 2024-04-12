import * as fs from 'node:fs';
import genDiff from '../index.js';
import parse from '../parsers.js';
import { stylish } from '../stylish.js';

const result = fs.readFileSync('./__fixtures__/result1.txt', 'utf8');
// const resultJson = parse('./__fixtures__/result.txt');
// const resultYml = parse('./__fixtures__/result.txt');

test('gendiff', () => {
  expect(stylish(genDiff(parse('./__fixtures__/file1.json'), parse('./__fixtures__/file2.json')))).toEqual(result);
  // expect(stylish(genDiff(parse('./__fixtures__/file1.yml'), parse('./__fixtures__/file2.yml')))).toEqual(result);
});
