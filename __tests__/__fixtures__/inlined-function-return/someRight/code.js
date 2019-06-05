import { someRight } from "../../../../inline-loops.macro";

const areAnyEven = someRight(array, function(value) {
  return value % 2 === 0;
});
