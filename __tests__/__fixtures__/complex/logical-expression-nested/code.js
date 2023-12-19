import { reduce } from '../../../../src/inline-loops.macro';

function getStuff(array, override) {
  return override || reduce(array, (a, v) => a + v * 2, 0) || 1;
}
