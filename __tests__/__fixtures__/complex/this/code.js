import { map } from '../../../../src/inline-loops.macro';

function foo(array) {
  return map(array, function (value) {
    return this && this.foo ? value : null;
  });
}
