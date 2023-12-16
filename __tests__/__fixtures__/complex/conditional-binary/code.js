import { reduce } from '../../../../src/inline-loops.macro';

function getStuff(array) {
  return array ** reduce(array, (a, v) => a + v * 2);
}
