import * as fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const jsonParse = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const ymlParse = (filePath) => yaml.load(fs.readFileSync(filePath, 'utf8'));

const parse = (filePath) => {
  if (path.extname(filePath) === '.json') {
    return jsonParse(filePath);
  }

  return ymlParse(filePath);
};

export default parse;
