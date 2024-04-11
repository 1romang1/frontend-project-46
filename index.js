import _ from "lodash";
import parse from "./parsers.js";

const obj1 = parse('./__fixtures__/file1.json');
const obj2 = parse('./__fixtures__/file2.json');

const genDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2).sort();

  const result = keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: obj2[key], status: "added" };
    }

    if (!Object.hasOwn(obj2, key)) {
      return { key, value: obj1[key], status: "deleted" };
    }

    if (obj1[key] !== obj2[key]) {
      if (typeof obj1[key] === "object" && obj1[key] !== null && typeof obj2[key] === "object" && obj2[key] !== null) {
        return { key, value: genDiff(obj1[key], obj2[key]), status: 'withChildrens' };
      }
      return {
        key,
        value: obj1[key],
        changedValue: obj2[key],
        status: "changed",
      };
    }
    return { key, value: obj1[key], status: "unchanged" };
  });

  return result;
};

export default genDiff;

console.log(JSON.stringify(genDiff(obj1, obj2), null, ' '));