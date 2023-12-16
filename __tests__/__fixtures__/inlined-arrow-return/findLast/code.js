import { findLast } from '../../../../src/inline-loops.macro';

const lastEven = findLast(array, (value) => {
  return value % 2 === 0;
});
