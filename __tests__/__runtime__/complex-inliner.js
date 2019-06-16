const { map, reduce } = require('../../src/inline-loops.macro');

const { deepEqual: isEqual } = require('fast-equals');

const ARRAY = [1, 2, 3, 4, 5, 6];

// eslint-disable-next-line
const shadowed = 100;

module.exports = {
  conditional: {
    standard: {
      true: isEqual(
        (() => {
          if (shadowed === 100) {
            return map(ARRAY, v => v * 2);
          }

          return ARRAY;
        })(),
        ARRAY.map(v => v * 2),
      ),
    },
  },
  ifStatement: {
    standard: {
      true: isEqual(
        map(ARRAY, (value) => {
          let transformed = value * 2;

          if (value % 2 === 0) {
            transformed += 10;
          }

          return transformed;
        }),
        ARRAY.map((value) => {
          let transformed = value * 2;

          if (value % 2 === 0) {
            transformed += 10;
          }

          return transformed;
        }),
      ),
    },
  },
  shadowName: {
    standard: {
      true: isEqual(
        map(ARRAY, (value) => {
          let shadowed = value ** 2;

          if (shadowed % 2 !== 0) {
            shadowed += 1;
          }

          return shadowed;
        }),
        ARRAY.map((value) => {
          let shadowed = value ** 2;

          if (shadowed % 2 !== 0) {
            shadowed += 1;
          }

          return shadowed;
        }),
      ),
    },
  },
  internalCall: {
    standard: {
      true: isEqual(
        map(ARRAY, (value) => {
          const sub = new Array(10).fill(3);

          return reduce(map(sub, v => value * v), (sum, v) => sum + v);
        }),
        ARRAY.map((value) => {
          const sub = new Array(10).fill(3);

          return sub.map(v => value * v).reduce((sum, v) => sum + v);
        }),
      ),
    },
  },
};
