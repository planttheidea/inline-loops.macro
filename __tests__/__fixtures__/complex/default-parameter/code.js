import { map } from '../../../../src/inline-loops.macro';

function getStuff(array, doubled = map(array, (v) => v * 2)) {
  return doubled;
}
