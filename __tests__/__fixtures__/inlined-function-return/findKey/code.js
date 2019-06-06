import { findKey } from "../../../../src/inline-loops.macro";

const firstEven = findKey(object, function(value) {
  return value % 2 === 0;
});
