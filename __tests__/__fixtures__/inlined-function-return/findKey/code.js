import { findKey } from "../../../../inline-loops.macro";

const firstEven = findKey(object, function(value) {
  return value % 2 === 0;
});
