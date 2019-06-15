import { flatMap } from '../../../../src/inline-loops.macro';

const flattened = flatMap(array, entry => {
  return [entry[0]];
});
