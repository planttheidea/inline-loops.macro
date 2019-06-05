import { findObject } from "../../../../inline-loops.macro";

const firstEven = findObject(object, function(value) {
  return value % 2 === 0;
});
