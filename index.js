import path from 'node:path';
import { cwd } from 'node:process';
import parse from './parsers.js';
import buildAstTree from './buildAstTree.js';
import formater from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const currentDir = cwd();
  const currentPath1 = path.resolve(currentDir, filePath1);
  const currentPath2 = path.resolve(currentDir, filePath2);
  const tree1 = parse(currentPath1);
  const tree2 = parse(currentPath2);
  const astTree = buildAstTree(tree1, tree2);
  return formater(astTree, formatName);
};

export default genDiff;
