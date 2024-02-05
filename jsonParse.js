import * as fs from "node:fs";
import path from "node:path";

const getPath = (fileName) => {
  return path.resolve(fileName);
};

const jsonParse = (filename) => {
  const filePath = getPath(filename);
//   console.l(path.extname(filePath))
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

export default jsonParse;