/* eslint-disable */

const { reduce, reduceObject, reduceRight } = require('../../src/inline-loops.macro');

const { deepEqual: isEqual } = require('fast-equals');

const ARRAY = [1, 2, 3, 4, 5, 6];
const OBJECT = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };

const isEven = (total, value) => {
  if (value % 2 === 0) {
    total += value;
  }

  return total;
};

const BAD_ARRAY_RESULT = [...ARRAY];
const ARRAY_RESULT = ARRAY.reduce(isEven);

const BAD_DECREMENTING_ARRAY_RESULT = [...BAD_ARRAY_RESULT].reverse();
const DECREMENTING_ARRAY_RESULT = ARRAY.reduceRight(isEven);

const BAD_OBJECT_RESULT = Object.assign({}, OBJECT);
const OBJECT_RESULT = Object.values(OBJECT).reduce(isEven);

module.exports = {
  cached: {
    decrementing: {
      false: isEqual(reduceRight(ARRAY, isEven), BAD_DECREMENTING_ARRAY_RESULT),
      true: isEqual(reduceRight(ARRAY, isEven), DECREMENTING_ARRAY_RESULT),
    },
    object: {
      false: isEqual(reduceObject(OBJECT, isEven), BAD_OBJECT_RESULT),
      true: isEqual(reduceObject(OBJECT, isEven), OBJECT_RESULT),
    },
    standard: {
      false: isEqual(reduce(ARRAY, isEven), BAD_ARRAY_RESULT),
      true: isEqual(reduce(ARRAY, isEven), ARRAY_RESULT),
    },
  },
  inlinedArrowExpression: {
    decrementing: {
      false: isEqual(
        reduceRight(ARRAY, (total, value) => (value % 2 === 0 ? total + value : total)),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        reduceRight(ARRAY, (total, value) => (value % 2 === 0 ? total + value : total)),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    object: {
      false: isEqual(
        reduceObject(OBJECT, (total, value) => (value % 2 === 0 ? total + value : total)),
        BAD_OBJECT_RESULT,
      ),
      true: isEqual(
        reduceObject(OBJECT, (total, value) => (value % 2 === 0 ? total + value : total)),
        OBJECT_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        reduce(ARRAY, (total, value) => (value % 2 === 0 ? total + value : total)),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        reduce(ARRAY, (total, value) => (value % 2 === 0 ? total + value : total)),
        ARRAY_RESULT,
      ),
    },
  },
  inlinedArrowReturn: {
    decrementing: {
      false: isEqual(
        reduceRight(ARRAY, (total, value) => {
          return value % 2 === 0 ? total + value : total;
        }),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        reduceRight(ARRAY, (total, value) => {
          return value % 2 === 0 ? total + value : total;
        }),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    object: {
      false: isEqual(
        reduceObject(OBJECT, (total, value) => {
          return value % 2 === 0 ? total + value : total;
        }),
        BAD_OBJECT_RESULT,
      ),
      true: isEqual(
        reduceObject(OBJECT, (total, value) => {
          return value % 2 === 0 ? total + value : total;
        }),
        OBJECT_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        reduce(ARRAY, (total, value) => {
          return value % 2 === 0 ? total + value : total;
        }),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        reduce(ARRAY, (total, value) => {
          return value % 2 === 0 ? total + value : total;
        }),
        ARRAY_RESULT,
      ),
    },
  },
  inlinedFunctionReturn: {
    decrementing: {
      false: isEqual(
        reduceRight(ARRAY, function(total, value) {
          return value % 2 === 0 ? total + value : total;
        }),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        reduceRight(ARRAY, function(total, value) {
          return value % 2 === 0 ? total + value : total;
        }),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    object: {
      false: isEqual(
        reduceObject(OBJECT, function(total, value) {
          return value % 2 === 0 ? total + value : total;
        }),
        BAD_OBJECT_RESULT,
      ),
      true: isEqual(
        reduceObject(OBJECT, function(total, value) {
          return value % 2 === 0 ? total + value : total;
        }),
        OBJECT_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        reduce(ARRAY, (total, value) => {
          return value % 2 === 0 ? total + value : total;
        }),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        reduce(ARRAY, (total, value) => {
          return value % 2 === 0 ? total + value : total;
        }),
        ARRAY_RESULT,
      ),
    },
  },
  uncached: {
    decrementing: {
      false: isEqual(
        reduceRight([].concat(ARRAY), (total, value) => {
          if (value % 2 === 0) {
            total += value;
          }

          return total;
        }),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        reduceRight([].concat(ARRAY), (total, value) => {
          if (value % 2 === 0) {
            total += value;
          }

          return total;
        }),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    object: {
      false: isEqual(
        reduceObject(Object.assign({}, OBJECT), (total, value) => {
          if (value % 2 === 0) {
            total += value;
          }

          return total;
        }),
        BAD_OBJECT_RESULT,
      ),
      true: isEqual(
        reduceObject(Object.assign({}, OBJECT), (total, value) => {
          if (value % 2 === 0) {
            total += value;
          }

          return total;
        }),
        OBJECT_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        reduce([].concat(ARRAY), (total, value) => {
          if (value % 2 === 0) {
            total += value;
          }

          return total;
        }),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        reduce([].concat(ARRAY), (total, value) => {
          if (value % 2 === 0) {
            total += value;
          }

          return total;
        }),
        ARRAY_RESULT,
      ),
    },
  },
};
