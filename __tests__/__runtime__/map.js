/* eslint-disable */

const { map, mapObject, mapRight } = require('../../src/inline-loops.macro');

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
const ARRAY_RESULT = ARRAY.map(isEven);

const BAD_DECREMENTING_ARRAY_RESULT = [...BAD_ARRAY_RESULT].reverse();
const DECREMENTING_ARRAY_RESULT = [...ARRAY_RESULT].reverse();

const BAD_OBJECT_RESULT = Object.assign({}, OBJECT);
const OBJECT_RESULT = Object.keys(OBJECT).reduce((evenObject, key) => {
  evenObject[key] = isEven(OBJECT[key]);

  return evenObject;
}, {});

module.exports = {
  cached: {
    decrementing: {
      false: isEqual(mapRight(ARRAY, isEven), BAD_DECREMENTING_ARRAY_RESULT),
      true: isEqual(mapRight(ARRAY, isEven), DECREMENTING_ARRAY_RESULT),
    },
    object: {
      false: isEqual(mapObject(OBJECT, isEven), BAD_OBJECT_RESULT),
      true: isEqual(mapObject(OBJECT, isEven), OBJECT_RESULT),
    },
    standard: {
      false: isEqual(map(ARRAY, isEven), BAD_ARRAY_RESULT),
      true: isEqual(map(ARRAY, isEven), ARRAY_RESULT),
    },
  },
  inlinedArrowExpression: {
    decrementing: {
      false: isEqual(mapRight(ARRAY, value => value % 2 === 0), BAD_DECREMENTING_ARRAY_RESULT),
      true: isEqual(mapRight(ARRAY, value => value % 2 === 0), DECREMENTING_ARRAY_RESULT),
    },
    object: {
      false: isEqual(mapObject(OBJECT, value => value % 2 === 0), BAD_OBJECT_RESULT),
      true: isEqual(mapObject(OBJECT, value => value % 2 === 0), OBJECT_RESULT),
    },
    standard: {
      false: isEqual(map(ARRAY, value => value % 2 === 0), BAD_ARRAY_RESULT),
      true: isEqual(map(ARRAY, value => value % 2 === 0), ARRAY_RESULT),
    },
  },
  inlinedArrowReturn: {
    decrementing: {
      false: isEqual(
        mapRight(ARRAY, value => {
          return value % 2 === 0;
        }),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        mapRight(ARRAY, value => {
          return value % 2 === 0;
        }),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    object: {
      false: isEqual(
        mapObject(OBJECT, value => {
          return value % 2 === 0;
        }),
        BAD_OBJECT_RESULT,
      ),
      true: isEqual(
        mapObject(OBJECT, value => {
          return value % 2 === 0;
        }),
        OBJECT_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        map(ARRAY, value => {
          return value % 2 === 0;
        }),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        map(ARRAY, value => {
          return value % 2 === 0;
        }),
        ARRAY_RESULT,
      ),
    },
  },
  inlinedFunctionReturn: {
    decrementing: {
      false: isEqual(
        mapRight(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        mapRight(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    object: {
      false: isEqual(
        mapObject(OBJECT, function(value) {
          return value % 2 === 0;
        }),
        BAD_OBJECT_RESULT,
      ),
      true: isEqual(
        mapObject(OBJECT, function(value) {
          return value % 2 === 0;
        }),
        OBJECT_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        map(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        map(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        ARRAY_RESULT,
      ),
    },
  },
  uncached: {
    decrementing: {
      false: isEqual(
        mapRight([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        mapRight([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    object: {
      false: isEqual(
        mapObject(Object.assign({}, OBJECT), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        BAD_OBJECT_RESULT,
      ),
      true: isEqual(
        mapObject(Object.assign({}, OBJECT), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        OBJECT_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        map([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        map([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        ARRAY_RESULT,
      ),
    },
  },
};
