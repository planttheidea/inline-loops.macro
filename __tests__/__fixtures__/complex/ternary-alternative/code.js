import { map } from '../../../../src/inline-loops.macro';

function getStuff(array, foo) {
  return foo === 'bar' ? array : map(array, (v) => v * 2);
}
