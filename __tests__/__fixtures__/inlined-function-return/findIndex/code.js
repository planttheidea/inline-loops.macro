import { findIndex } from "../../../../src/inline-loops.macro";

const firstEven = findIndex(array, function(value) {
  return value % 2 === 0;
});
