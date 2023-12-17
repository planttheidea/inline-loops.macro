import { map } from '../../../../src/inline-loops.macro';

function getStuff(array, foo) {
  return foo === 'bar' ? map(array, (v) => v * 2) : array;
}
