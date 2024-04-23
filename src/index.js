import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import parse from './parsers.js';
import buildAstTree from './buildAstTree.js';
import formater from './formatters/index.js';

const getFileData = (filePath) => fs.readFileSync(filePath, 'utf8');
const getFileExtension = (filePath) => filePath.split('.').reverse()[0];

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const currentDir = cwd();
  const currentPath1 = path.resolve(currentDir, filePath1);
  const currentPath2 = path.resolve(currentDir, filePath2);
  const tree1 = parse(getFileData(currentPath1), getFileExtension(currentPath1));
  const tree2 = parse(getFileData(currentPath2), getFileExtension(currentPath2));
  const astTree = buildAstTree(tree1, tree2);
  return formater(astTree, formatName);
};

export default genDiff;
