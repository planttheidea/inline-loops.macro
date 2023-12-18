import { findLast } from '../../../../src/inline-loops.macro';

const lastEven = findLast(array, function (value) {
  return value % 2 === 0;
});
