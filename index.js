import parse from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const obj1 = parse(filePath1);
  const obj2 = parse(filePath2);
  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();

  const result = [];

  keys1.forEach((key) => {
    if (Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        result.push(`  ${key}: ${obj1[key]}`);
      } else {
        result.push(`- ${key}: ${obj1[key]}`);
        result.push(`+ ${key}: ${obj2[key]}`);
      }
    } else {
      result.push(`- ${key}: ${obj1[key]}`);
    }
  });

  keys2.forEach((key) => {
    if (!Object.hasOwn(obj1, key)) {
      result.push(`+ ${key}: ${obj2[key]}`);
    }
  });
  return result.join('\n');
};

export default genDiff;
