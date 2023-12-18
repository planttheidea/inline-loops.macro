import { reduce } from '../../../../src/inline-loops.macro';

function getStuff(array, foo) {
  return reduce(array, (a, v) => a + v * 2, 0) ? 'stuff' : null;
}
