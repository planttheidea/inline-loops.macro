import { findRight } from "../../../../inline-loops.macro";

const lastEven = findRight(array, value => {
  return value % 2 === 0;
});
