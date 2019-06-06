import { mapRight } from "../../../../src/inline-loops.macro";

const doubledValues = mapRight(array, function(value) {
  return value * 2;
});
