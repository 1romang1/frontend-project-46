import * as fs from 'node:fs';

const jsonParse = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

export default jsonParse;
