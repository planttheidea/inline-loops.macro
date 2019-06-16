import { map } from '../../../../src/inline-loops.macro';

const result = map([1, 2, 3], (value) => {
  if (value === 2) {
    return 82;
  }

  return value;
});
