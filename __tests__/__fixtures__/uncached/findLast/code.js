import { findLast } from '../../../../src/inline-loops.macro';

const lastEven = findLast([1, 2, 3, 4], (value) => {
  const isValueEven = value % 2 === 0;

  return isValueEven;
});
