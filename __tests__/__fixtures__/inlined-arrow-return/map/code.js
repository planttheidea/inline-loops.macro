import { map } from "../../../../src/inline-loops.macro";

const doubledValues = map(array, value => {
  return value * 2;
});
