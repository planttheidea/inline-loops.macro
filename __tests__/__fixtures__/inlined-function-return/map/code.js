import { map } from "../../../../src/inline-loops.macro";

const doubledValues = map(array, function(value) {
  return value * 2;
});
