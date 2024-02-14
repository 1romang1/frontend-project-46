import { jsonParse, genDiff } from '../index.js';

const result = jsonParse('./__fixtures__/result.json');

test('gendiff', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(result);
});
