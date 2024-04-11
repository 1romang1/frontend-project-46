import _ from 'lodash';
// import genDiff from "./sandbox.js";

const stylish = (arr) => {
  const iter = (currentValue, depth) => {
    const SPACE_COUNT = 4;
    const REPLACER = '.';
    if (!_.isObject(currentValue)) {
      return `  ${currentValue}`;
    }

    const indentSize = depth * SPACE_COUNT;
    const currentIndent = REPLACER.repeat(indentSize - 2);
    const bracketIndent = REPLACER.repeat(indentSize - SPACE_COUNT);
    const result = currentValue.map((item) => {
      const { key, value, changedValue, status } = item;
      switch (status) {
        case 'added':
          return `${currentIndent}+ ${key}: ${value}`;
        case 'deleted':
          return `${currentIndent}- ${key}: ${value}`;
        case 'changed':
          return `${currentIndent}- ${key}: ${value}\n${currentIndent}+ ${key}: ${changedValue}`;
        case 'withChildrens':
          return `${currentIndent}  ${key}: ${iter(value, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${value}`;
        default:
        // default;
      }

      return result;
    });
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };
  return iter(arr, 1);
};

const test = [
  {
    key: 'common',
    value: [
      {
        key: 'follow',
        value: false,
        status: 'added',
      },
      {
        key: 'setting1',
        value: 'Value 1',
        status: 'unchanged',
      },
      {
        key: 'setting2',
        value: 200,
        status: 'deleted',
      },
      {
        key: 'setting3',
        value: true,
        changedValue: null,
        status: 'changed',
      },
      {
        key: 'setting4',
        value: 'blah blah',
        status: 'added',
      },
      {
        key: 'setting5',
        value: {
          key5: 'value5',
        },
        status: 'added',
      },
      {
        key: 'setting6',
        value: [
          {
            key: 'doge',
            value: [
              {
                key: 'wow',
                value: '',
                changedValue: 'so much',
                status: 'changed',
              },
            ],
            status: 'withChildrens',
          },
          {
            key: 'key',
            value: 'value',
            status: 'unchanged',
          },
          {
            key: 'ops',
            value: 'vops',
            status: 'added',
          },
        ],
        status: 'withChildrens',
      },
    ],
    status: 'withChildrens',
  },
  {
    key: 'group1',
    value: [
      {
        key: 'baz',
        value: 'bas',
        changedValue: 'bars',
        status: 'changed',
      },
      {
        key: 'foo',
        value: 'bar',
        status: 'unchanged',
      },
      {
        key: 'nest',
        value: {
          key: 'value',
        },
        changedValue: 'str',
        status: 'changed',
      },
    ],
    status: 'withChildrens',
  },
  {
    key: 'group2',
    value: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
    status: 'deleted',
  },
  {
    key: 'group3',
    value: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
    status: 'added',
  },
];
console.log(stylish(test));
