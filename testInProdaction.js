import * as fs from 'node:fs';

const jsonParse = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

export const gendiff = (filePath1, filePath2) => {
  const obj1 = jsonParse(filePath1);
  const obj2 = jsonParse(filePath2);
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
console.log(gendiff('file1.json', 'file2.json'));
export default jsonParse;
