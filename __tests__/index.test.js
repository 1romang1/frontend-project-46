import * as fs from 'node:fs';
import buildAstTree from '../index.js';
import parse from '../parsers.js';
import genDiff from '../sandbox.js';

const result = fs.readFileSync('./__fixtures__/result1.txt', 'utf8');
// const resultJson = parse('./__fixtures__/result.txt');
// const resultYml = parse('./__fixtures__/result.txt');

const resultPlain = fs.readFileSync('./__fixtures__/plain.txt', 'utf8');

test('gendiff', () => {
  expect(genDiff(buildAstTree(parse('./__fixtures__/file1.json'), parse('./__fixtures__/file2.json')))).toEqual(result);
  expect(genDiff(buildAstTree(parse('./__fixtures__/file1.yml'), parse('./__fixtures__/file2.yml')))).toEqual(result);
});

test('gendiff plain format', () => {
  expect(genDiff(buildAstTree(parse('./__fixtures__/file1.json'), parse('./__fixtures__/file2.json'))), 'plain').toEqual(resultPlain);
  expect(genDiff(buildAstTree(parse('./__fixtures__/file1.yml'), parse('./__fixtures__/file2.yml'))), 'plain').toEqual(resultPlain);
});
