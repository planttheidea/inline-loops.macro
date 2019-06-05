import { findRight } from "../../../../inline-loops.macro";

const lastEven = findRight(array, function(value) {
  return value % 2 === 0;
});
