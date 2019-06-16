import { forEach } from '../../../../src/inline-loops.macro';

forEach([], ({ a, b: { c } }) => {
  console.log(a, c);
});
