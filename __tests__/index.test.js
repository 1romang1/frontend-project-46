import * as fs from 'node:fs';
import genDiff from '../sandbox.js';

const result = fs.readFileSync('./__fixtures__/result1.txt', 'utf8');
const resultPlain = fs.readFileSync('./__fixtures__/plain.txt', 'utf8');

test('gendiff', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(result);
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toEqual(result);
});

test('gendiff plain format', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'plain')).toEqual(resultPlain);
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'plain')).toEqual(resultPlain);
});
