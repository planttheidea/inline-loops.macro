/* eslint-disable */

const { flatMap, flatMapRight } = require('../../src/inline-loops.macro');

const { deepEqual: isEqual } = require('fast-equals');

const ARRAY = [[1], [2], [3], [4], [5], [6]];

const withTriples = value => [value, value * 2, value * 3];

const BAD_ARRAY_RESULT = [...ARRAY];
const ARRAY_RESULT = ARRAY.reduce((accumulator, value) => {
  const result = withTriples(value);

  accumulator.push(...result);

  return accumulator;
}, []);

const BAD_DECREMENTING_ARRAY_RESULT = [...ARRAY].reverse();
const DECREMENTING_ARRAY_RESULT = ARRAY.reduceRight((accumulator, value) => {
  const result = withTriples(value);

  accumulator.push(...result);

  return accumulator;
}, []);

module.exports = {
  cached: {
    decrementing: {
      false: isEqual(flatMapRight(ARRAY, withTriples), BAD_DECREMENTING_ARRAY_RESULT),
      true: isEqual(flatMapRight(ARRAY, withTriples), DECREMENTING_ARRAY_RESULT),
    },
    standard: {
      false: isEqual(flatMap(ARRAY, withTriples), BAD_ARRAY_RESULT),
      true: isEqual(flatMap(ARRAY, withTriples), ARRAY_RESULT),
    },
  },
  inlinedArrowExpression: {
    decrementing: {
      false: isEqual(
        flatMapRight(ARRAY, value => [value, value * 2, value * 3]),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        flatMapRight(ARRAY, value => [value, value * 2, value * 3]),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    standard: {
      false: isEqual(flatMap(ARRAY, value => [value, value * 2, value * 3]), BAD_ARRAY_RESULT),
      true: isEqual(flatMap(ARRAY, value => [value, value * 2, value * 3]), ARRAY_RESULT),
    },
  },
  inlinedArrowReturn: {
    decrementing: {
      false: isEqual(
        flatMapRight(ARRAY, value => {
          return [value, value * 2, value * 3];
        }),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        flatMapRight(ARRAY, value => {
          return [value, value * 2, value * 3];
        }),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        flatMap(ARRAY, value => {
          return [value, value * 2, value * 3];
        }),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        flatMap(ARRAY, value => {
          return [value, value * 2, value * 3];
        }),
        ARRAY_RESULT,
      ),
    },
  },
  inlinedFunctionReturn: {
    decrementing: {
      false: isEqual(
        flatMapRight(ARRAY, function(value) {
          return [value, value * 2, value * 3];
        }),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        flatMapRight(ARRAY, function(value) {
          return [value, value * 2, value * 3];
        }),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        flatMap(ARRAY, function(value) {
          return [value, value * 2, value * 3];
        }),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        flatMap(ARRAY, function(value) {
          return [value, value * 2, value * 3];
        }),
        ARRAY_RESULT,
      ),
    },
  },
  uncached: {
    decrementing: {
      false: isEqual(
        flatMapRight([].concat(ARRAY), value => {
          const withTriples = [value, value * 2, value * 3];

          return withTriples;
        }),
        BAD_DECREMENTING_ARRAY_RESULT,
      ),
      true: isEqual(
        flatMapRight([].concat(ARRAY), value => {
          const withTriples = [value, value * 2, value * 3];

          return withTriples;
        }),
        DECREMENTING_ARRAY_RESULT,
      ),
    },
    standard: {
      false: isEqual(
        flatMap([].concat(ARRAY), value => {
          const withTriples = [value, value * 2, value * 3];

          return withTriples;
        }),
        BAD_ARRAY_RESULT,
      ),
      true: isEqual(
        flatMap([].concat(ARRAY), value => {
          const withTriples = [value, value * 2, value * 3];

          return withTriples;
        }),
        ARRAY_RESULT,
      ),
    },
  },
};
