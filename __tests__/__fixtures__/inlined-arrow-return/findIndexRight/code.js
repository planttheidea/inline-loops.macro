import { findIndexRight } from "../../../../src/inline-loops.macro";

const firstEven = findIndexRight(array, value => {
  return value % 2 === 0;
});
