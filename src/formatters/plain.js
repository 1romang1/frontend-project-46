import _ from 'lodash';

const stringify = (node) => {
  if (_.isObject(node)) {
    return '[complex value]';
  }
  if (typeof node === 'string') {
    return `'${node}'`;
  }
  return node;
};

const plain = (arr) => {
  const iter = (currentValue, pathToValue) => {
    const result = currentValue.flatMap((item) => {
      const {
        key, value, changedValue, status,
      } = item;
      const currentPathToValue = pathToValue === '' ? `${key}` : `${pathToValue}.${key}`;
      switch (status) {
        case 'added':
          return `Property '${currentPathToValue}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${currentPathToValue}' was removed`;
        case 'changed':
          return `Property '${currentPathToValue}' was updated. From ${stringify(value)} to ${stringify(changedValue)}`;
        case 'withChildrens':
          return iter(value, currentPathToValue);
        case 'unchanged':
          return [];
        default:
        // default;
      }
      return result;
    });
    return result.join('\n');
  };
  return iter(arr, '');
};

export default plain;
