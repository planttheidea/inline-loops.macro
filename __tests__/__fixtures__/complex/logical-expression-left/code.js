import { reduce } from '../../../../src/inline-loops.macro';

function getStuff(array) {
  return reduce(array, (a, v) => a + v * 2, 0) || 1;
}
