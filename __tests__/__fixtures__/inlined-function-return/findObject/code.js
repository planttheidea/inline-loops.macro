import { findObject } from "../../../../src/inline-loops.macro";

const firstEven = findObject(object, function(value) {
  return value % 2 === 0;
});
