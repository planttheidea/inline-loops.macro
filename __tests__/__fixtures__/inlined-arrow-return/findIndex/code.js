import { findIndex } from "../../../../src/inline-loops.macro";

const firstEven = findIndex(array, value => {
  return value % 2 === 0;
});
