/* eslint-disable */

const { forEach, forEachObject, forEachRight } = require('../../src/inline-loops.macro');

const ARRAY = [1, 2, 3, 4, 5, 6];
const OBJECT = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
};

module.exports = {
  cached: {
    decrementing: {
      true: (() => {
        const spy = jest.fn();

        forEachRight(ARRAY, spy);

        return spy.mock.calls.length === 6;
      })(),
    },
    object: {
      true: (() => {
        const spy = jest.fn();

        forEachObject(OBJECT, spy);

        return spy.mock.calls.length === 6;
      })(),
    },
    standard: {
      true: (() => {
        const spy = jest.fn();

        forEach(ARRAY, spy);

        return spy.mock.calls.length === 6;
      })(),
    },
  },
  inlinedArrowExpression: {
    decrementing: {
      true: (() => {
        let count = 0;

        forEachRight(ARRAY, () => count++);

        return count === 6;
      })(),
    },
    object: {
      true: (() => {
        let count = 0;

        forEachObject(OBJECT, () => count++);

        return count === 6;
      })(),
    },
    standard: {
      true: (() => {
        let count = 0;

        forEach(ARRAY, () => count++);

        return count === 6;
      })(),
    },
  },
  inlinedArrowReturn: {
    decrementing: {
      true: (() => {
        let count = 0;

        forEachRight(ARRAY, () => {
          count++;
        });

        return count === 6;
      })(),
    },
    object: {
      true: (() => {
        let count = 0;

        forEachObject(OBJECT, () => {
          count++;
        });

        return count === 6;
      })(),
    },
    standard: {
      true: (() => {
        let count = 0;

        forEach(ARRAY, () => {
          count++;
        });

        return count === 6;
      })(),
    },
  },
  inlinedFunctionReturn: {
    decrementing: {
      true: (() => {
        let count = 0;

        forEachRight(ARRAY, function() {
          count++;
        });

        return count === 6;
      })(),
    },
    object: {
      true: (() => {
        let count = 0;

        forEachObject(OBJECT, function() {
          count++;
        });

        return count === 6;
      })(),
    },
    standard: {
      true: (() => {
        let count = 0;

        forEach(ARRAY, function() {
          count++;
        });

        return count === 6;
      })(),
    },
  },
  uncached: {
    decrementing: {
      true: (() => {
        let count = 0;

        forEachRight([].concat(ARRAY), () => {
          count++;
        });

        return count === 6;
      })(),
    },
    object: {
      true: (() => {
        let count = 0;

        forEachObject(Object.assign({}, OBJECT), () => {
          count++;
        });

        return count === 6;
      })(),
    },
    standard: {
      true: (() => {
        let count = 0;

        forEach([].concat(ARRAY), () => {
          count++;
        });

        return count === 6;
      })(),
    },
  },
};
