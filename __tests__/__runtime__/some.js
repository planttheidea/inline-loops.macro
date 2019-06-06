/* eslint-disable */

const { some, someObject, someRight } = require('../../src/inline-loops.macro');

const ARRAY = [1, 2, 3, 4, 5, 6];
const OBJECT = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };

const isNegative = value => value < 0;
const isEven = value => value % 2 === 0;

module.exports = {
  cached: {
    decrementing: {
      false: someRight(ARRAY, isNegative),
      true: someRight(ARRAY, isEven),
    },
    object: {
      false: someObject(OBJECT, isNegative),
      true: someObject(OBJECT, isEven),
    },
    standard: {
      false: some(ARRAY, isNegative),
      true: some(ARRAY, isEven),
    },
  },
  inlinedArrowExpression: {
    decrementing: {
      false: someRight(ARRAY, value => value < 0),
      true: someRight(ARRAY, value => value % 2 === 0),
    },
    object: {
      false: someObject(OBJECT, value => value < 0),
      true: someObject(OBJECT, value => value % 2 === 0),
    },
    standard: {
      false: some(ARRAY, value => value < 0),
      true: some(ARRAY, value => value % 2 === 0),
    },
  },
  inlinedArrowReturn: {
    decrementing: {
      false: someRight(ARRAY, value => {
        return value < 0;
      }),
      true: someRight(ARRAY, value => {
        return value % 2 === 0;
      }),
    },
    object: {
      false: someObject(OBJECT, value => {
        return value < 0;
      }),
      true: someObject(OBJECT, value => {
        return value % 2 === 0;
      }),
    },
    standard: {
      false: some(ARRAY, value => {
        return value < 0;
      }),
      true: some(ARRAY, value => {
        return value % 2 === 0;
      }),
    },
  },
  inlinedFunctionReturn: {
    decrementing: {
      false: someRight(ARRAY, function(value) {
        return value < 0;
      }),
      true: someRight(ARRAY, function(value) {
        return value % 2 === 0;
      }),
    },
    object: {
      false: someObject(OBJECT, function(value) {
        return value < 0;
      }),
      true: someObject(OBJECT, function(value) {
        return value % 2 === 0;
      }),
    },
    standard: {
      false: some(ARRAY, function(value) {
        return value < 0;
      }),
      true: some(ARRAY, function(value) {
        return value % 2 === 0;
      }),
    },
  },
  uncached: {
    decrementing: {
      false: someRight([].concat(ARRAY), value => {
        const isNegative = value < 0;

        return isNegative;
      }),
      true: someRight([].concat(ARRAY), value => {
        const isEven = value % 2 === 0;

        return isEven;
      }),
    },
    object: {
      false: someObject(Object.assign({}, OBJECT), value => {
        const isNegative = value < 0;

        return isNegative;
      }),
      true: someObject(Object.assign({}, OBJECT), value => {
        const isEven = value % 2 === 0;

        return isEven;
      }),
    },
    standard: {
      false: some([].concat(ARRAY), value => {
        const isNegative = value < 0;

        return isNegative;
      }),
      true: some([].concat(ARRAY), value => {
        const isEven = value % 2 === 0;

        return isEven;
      }),
    },
  },
};
