import { findLastIndex } from '../../../../src/inline-loops.macro';

const firstEven = findLastIndex(array, (value) => {
  return value % 2 === 0;
});
