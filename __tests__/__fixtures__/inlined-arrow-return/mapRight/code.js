import { mapRight } from "../../../../src/inline-loops.macro";

const doubledValues = mapRight(array, value => {
  return value * 2;
});
