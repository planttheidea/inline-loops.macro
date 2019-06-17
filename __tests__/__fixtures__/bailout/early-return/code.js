import { filter } from '../../../../src/inline-loops.macro';

const result = filter([1, 2, 3], (value) => {
  if (value === 2) {
    return true;
  }
});
