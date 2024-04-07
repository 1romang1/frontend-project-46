import _ from "lodash";
import parse from "./parsers.js";

const genDiff = (filePath1, filePath2) => {
  const obj1 = parse(filePath1);
  const obj2 = parse(filePath2);
  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();
  const keys = _.union(keys1, keys2);

  const result = keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: obj2[key], status: "added" };
    }

    if (!Object.hasOwn(obj2, key)) {
      return { key, value: obj1[key], status: "deleted" };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key,
        value: obj1[key],
        changedValue: obj2[key],
        status: "changed",
      };
    }

    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      return { key, value: genDiff(obj1[key], obj2[key]), status: 'whithChildren' }
    }

    return { key, value: obj1[key], status: "unchanged" };
  });

  return result;
};

export default genDiff;

console.log(JSON.stringify(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json'), null, ' '));
