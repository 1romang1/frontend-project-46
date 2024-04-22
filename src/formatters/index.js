import stylish from './stylish.js';
import plain from './plain.js';

const formater = (astTree, fotmatName) => {
  if (fotmatName === 'plain') {
    return plain(astTree);
  }
  if (fotmatName === 'json') {
    return JSON.stringify(stylish(astTree));
  }
  return stylish(astTree);
};

export default formater;
