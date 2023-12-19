import { map } from '../../../../src/inline-loops.macro';

function getStuff(array) {
  return {
    array,
    doubled: map(array, (v) => v * 2),
  };
}
