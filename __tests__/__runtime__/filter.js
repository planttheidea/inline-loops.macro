/* eslint-disable */

const { filter, filterObject, filterRight } = require('../../src/inline-loops.macro');

const { deepEqual: isEqual } = require('fast-equals');

const ARRAY = [1, 2, 3, 4, 5, 6];
const OBJECT = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
};

const isEven = value => value % 2 === 0;

const BAD_ARRAY_RESULT = [...ARRAY];
const ARRAY_RESULT = ARRAY.filter(isEven);

const BAD_DECREMENTING_ARRAY_RESULT = [...ARRAY].reverse();
const DECREMENTING_ARRAY_RESULT = [...ARRAY_RESULT].reverse();

const BAD_OBJECT_RESULT = Object.assign({}, OBJECT);
const OBJECT_RESULT = Object.keys(OBJECT).reduce((evenObject, key) => {
  if (isEven(OBJECT[key])) {
    evenObject[key] = OBJECT[key];
  }

  return evenObject;
}, {});

module.exports = {
  cached: {
    decrementing: {
      false: isEqual(filterRight(ARRAY, isEven), BAD_DECREMENTING_ARRAY_RESULT),
      true: isEqual(filterRight(ARRAY, isEven), DECREMENTING_ARRAY_RESULT),
    },
    object: {
      false: isEqual(filterObject(OBJECT, isEven), BAD_OBJECT_RESULT),
      true: isEqual(filterObject(OBJECT, isEven), OBJECT_RESULT),
    },
    standard: {
      false: isEqual(filter(ARRAY, isEven), BAD_ARRAY_RESULT),
      true: isEqual(filter(ARRAY, isEven), ARRAY_RESULT),
    },
  },
  inlinedArrowExpression: {
    decrementing: {
      false: isEqual(filterRight(ARRAY, value => value % 2 === 0), BAD_DECREMENTING_ARRAY_RESULT),
      true: isEqual(filterRight(ARRAY, value => value % 2 === 0), DECREMENTING_ARRAY_RESULT),
    },
    object: {
      false: isEqual(filterObject(OBJECT, value => value % 2 === 0), BAD_OBJECT_RESULT),
      true: isEqual(filterObject(OBJECT, value => value % 2 === 0), OBJECT_RESULT),
    },
    standard: {
      false: isEqual(filter(ARRAY, value => value % 2 === 0), BAD_ARRAY_RESULT),
      true: isEqual(filter(ARRAY, value => value % 2 === 0), ARRAY_RESULT),
    },
  },
  inlinedArrowReturn: {
    decrementing: {
      false: isEqual(
        filterRight(ARRAY, value => {
          return value % 2 === 0;
        }),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        filterRight(ARRAY, value => {
          return value % 2 === 0;
        }),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    object: {
      false: isEqual(
        filterObject(OBJECT, value => {
          return value % 2 === 0;
        }),
        BAD_OBJECT_RESULT,
      ),
      true: isEqual(
        filterObject(OBJECT, value => {
          return value % 2 === 0;
        }),
        OBJECT_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        filter(ARRAY, value => {
          return value % 2 === 0;
        }),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        filter(ARRAY, value => {
          return value % 2 === 0;
        }),
        ARRAY_RESULT,
      ),
    },
  },
  inlinedFunctionReturn: {
    decrementing: {
      false: isEqual(
        filterRight(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        filterRight(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    object: {
      false: isEqual(
        filterObject(OBJECT, function(value) {
          return value % 2 === 0;
        }),
        BAD_OBJECT_RESULT,
      ),
      true: isEqual(
        filterObject(OBJECT, function(value) {
          return value % 2 === 0;
        }),
        OBJECT_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        filter(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        filter(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        ARRAY_RESULT,
      ),
    },
  },
  uncached: {
    decrementing: {
      false: isEqual(
        filterRight([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        filterRight([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    object: {
      false: isEqual(
        filterObject(Object.assign({}, OBJECT), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        BAD_OBJECT_RESULT,
      ),
      true: isEqual(
        filterObject(Object.assign({}, OBJECT), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        OBJECT_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        filter([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        filter([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        ARRAY_RESULT,
      ),
    },
  },
};
