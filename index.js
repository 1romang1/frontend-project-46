import parse from './parsers.js';
import buildAstTree from './buildAstTree.js';
import formater from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const tree1 = parse(filePath1);
  const tree2 = parse(filePath2);
  const astTree = buildAstTree(tree1, tree2);
  return formater(astTree, formatName);
};

export default genDiff;
