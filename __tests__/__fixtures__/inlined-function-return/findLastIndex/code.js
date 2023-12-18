import { findLastIndex } from '../../../../src/inline-loops.macro';

const firstEven = findLastIndex(array, function (value) {
  return value % 2 === 0;
});
