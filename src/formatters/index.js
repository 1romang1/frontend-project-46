import stylish from './stylish.js';
import plain from './plain.js';

const formater = (astTree, fotmatName) => {
  switch (fotmatName) {
    case 'plain':
      return plain(astTree);
    case 'json':
      return JSON.stringify(stylish(astTree));
    default:
      return stylish(astTree);
  }
};

export default formater;
