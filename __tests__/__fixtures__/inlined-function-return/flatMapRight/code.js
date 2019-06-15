import { flatMapRight } from '../../../../src/inline-loops.macro';

const flattened = flatMapRight(array, function(entry) {
  return [entry[0]];
});
