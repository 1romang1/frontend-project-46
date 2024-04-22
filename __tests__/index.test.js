import * as fs from 'node:fs';
import genDiff from '../src/index.js';

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
