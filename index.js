import _ from 'lodash';
import parse from './parsers.js';

const obj1 = parse('./__fixtures__/file1.json');
const obj2 = parse('./__fixtures__/file2.json');

const genDiff = (tree1, tree2) => {
  const keys = _.union(Object.keys(tree1), Object.keys(tree2)).sort();

  const result = keys.map((key) => {
    if (!Object.hasOwn(tree1, key)) {
      return { key, value: tree2[key], status: 'added' };
    }

    if (!Object.hasOwn(tree2, key)) {
      return { key, value: tree1[key], status: 'deleted' };
    }

    if (tree1[key] !== tree2[key]) {
      if (
        typeof tree1[key] === 'object'
        && tree1[key] !== null
        && typeof tree2[key] === 'object'
        && tree2[key] !== null
      ) {
        return {
          key,
          value: genDiff(tree1[key], tree2[key]),
          status: 'withChildrens',
        };
      }
      return {
        key,
        value: tree1[key],
        changedValue: tree2[key],
        status: 'changed',
      };
    }
    return { key, value: tree1[key], status: 'unchanged' };
  });

  return result;
};

export default genDiff;

// console.log(JSON.stringify(genDiff(obj1, obj2), null, ' '));
