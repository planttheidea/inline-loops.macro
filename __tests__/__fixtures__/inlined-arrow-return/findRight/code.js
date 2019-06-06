import { findRight } from "../../../../src/inline-loops.macro";

const lastEven = findRight(array, value => {
  return value % 2 === 0;
});
