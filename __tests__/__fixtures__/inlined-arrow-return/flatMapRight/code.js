import { flatMapRight } from '../../../../src/inline-loops.macro';

const flattened = flatMapRight(array, entry => {
  return [entry[0]];
});
