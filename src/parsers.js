import yaml from 'js-yaml';

const parse = (fileData, fileExtension) => {
  if (fileExtension === '.json') {
    return JSON.parse(fileData);
  }
  return yaml.load(fileData);
};

export default parse;
