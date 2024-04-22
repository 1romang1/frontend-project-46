import * as fs from 'node:fs';
import genDiff from '../src/index.js';

// const result = fs.readFileSync('./____fixtures____/result1.txt', 'utf8');
// const resultPlain = fs.readFileSync('./____fixtures____/plain.txt', 'utf8');
// const resultJson = JSON.stringify(fs.readFileSync('./____fixtures____/result1.txt', 'utf8'));

// test('gendiff', () => {
//   expect(genDiff('./____fixtures____/file1.json', './____fixtures____/file2.json')).toEqual(result);
//   expect(genDiff('./____fixtures____/file1.yml', './____fixtures____/file2.yml')).toEqual(result);
// });

// test('gendiff plain format', () => {
//   expect(genDiff('./____fixtures____/file1.json', './____fixtures____/file2.json', 'plain')).toEqual(resultPlain);
//   expect(genDiff('./____fixtures____/file1.yml', './____fixtures____/file2.yml', 'plain')).toEqual(resultPlain);
// });

// test('gendiff json format', () => {
//   expect(genDiff('./____fixtures____/file1.json', './____fixtures____/file2.json', 'json')).toEqual(resultJson);
//   expect(genDiff('./____fixtures____/file1.yml', './____fixtures____/file2.yml', 'json')).toEqual(resultJson);
// });
const testData = [
  ['./__fixtures__/file1.json', './__fixtures__/file2.json', undefined, './__fixtures__/result.txt'],
  ['./__fixtures__/file1.yml', './__fixtures__/file2.yml', undefined, './__fixtures__/result.txt'],
  ['./__fixtures__/file1.json', './__fixtures__/file2.json', 'stylish', './__fixtures__/result.txt'],
  ['./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'stylish', './__fixtures__/result.txt'],
  ['./__fixtures__/file1.json', './__fixtures__/file2.json', 'plain', './__fixtures__/resultPlain.txt'],
  ['./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'plain', './__fixtures__/resultPlain.txt'],
  ['./__fixtures__/file1.json', './__fixtures__/file2.json', 'json', './__fixtures__/resultJson.txt'],
  ['./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'json', './__fixtures__/resultJson.txt'],
];

test.each(testData)('gendiff', (file1, file2, format, expected) => {
  const result = fs.readFileSync(expected, 'utf8');
  expect(genDiff(file1, file2, format)).toEqual(result);
});
