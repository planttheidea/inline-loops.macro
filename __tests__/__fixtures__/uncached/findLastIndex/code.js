import { findLastIndex } from '../../../../src/inline-loops.macro';

const firstEven = findLastIndex([1, 2, 3, 4], (value) => {
  const isValueEven = value % 2 === 0;

  return isValueEven;
});
