import { someRight } from "../../../../src/inline-loops.macro";

const areAnyEven = someRight(array, function(value) {
  return value % 2 === 0;
});
