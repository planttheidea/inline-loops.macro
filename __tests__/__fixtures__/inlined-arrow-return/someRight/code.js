import { someRight } from "../../../../src/inline-loops.macro";

const areAnyEven = someRight(array, value => {
  return value % 2 === 0;
});
