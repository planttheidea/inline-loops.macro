import { forEach } from '../../../../src/inline-loops.macro';

forEach([], ([a, [b]]) => {
  console.log(a, b);
});
