// import pkg from '@jest/globals';

import { jsonParse, genDiff } from '../sandbox.js';

// const { test, expect } = pkg;
// import { genDiff } from "../bin/gendiff.js";

const result = jsonParse('./__fixtures__/result.json');
// console.log(JSON.stringify(result))

// const temp = genDiff('file1.json', 'file2.json');
// console.log(JSON.stringify(temp))

test('gendiff', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(result);
});
