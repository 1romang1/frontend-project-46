import _ from 'lodash';
// import genDiff from "./sandbox.js";

const stylish = (arr) => {
  const result = arr.map((item) => {
    const {
      key, value, changedValue, status,
    } = item;
    switch (status) {
      case 'added':
        return `+ ${key}: ${[value]}`;
      case 'deleted':
        return `- ${key}: ${[value]}`;
      case 'changed':
        return `- ${key}: ${[value]}
+ ${key}: ${[changedValue]}`;
      case 'unchanged':
        return `  ${key}: ${value}`;
      default:
      // default;
    }
    return result;
  });
  return ['{', ...result, '}'].join('\n');
};
const test = [
  { key: 'follow', value: false, status: 'deleted' },
  { key: 'host', value: 'hexlet.io', status: 'unchanged' },
  { key: 'proxy', value: '123.234.53.22', status: 'deleted' },
  {
    key: 'timeout',
    value: 50,
    changedValue: 20,
    status: 'changed',
  },
  { key: 'verbose', value: true, status: 'added' },
];
console.log(stylish(test));
