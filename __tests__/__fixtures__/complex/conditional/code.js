import { map } from '../../../../src/inline-loops.macro';

function getStuff() {
  if (foo === 'bar') {
    return map(array, v => v * 2);
  }

  return array;
}
