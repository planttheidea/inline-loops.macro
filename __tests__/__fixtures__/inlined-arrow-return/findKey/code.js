import { findKey } from "../../../../src/inline-loops.macro";

const firstEven = findKey(object, value => {
  return value % 2 === 0;
});
