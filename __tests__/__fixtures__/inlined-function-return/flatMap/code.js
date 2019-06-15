import { flatMap } from '../../../../src/inline-loops.macro';

const flattened = flatMap(array, function(entry) {
  return [entry[0]];
});
