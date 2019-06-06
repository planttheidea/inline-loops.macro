import { findRight } from "../../../../src/inline-loops.macro";

const lastEven = findRight(array, function(value) {
  return value % 2 === 0;
});
