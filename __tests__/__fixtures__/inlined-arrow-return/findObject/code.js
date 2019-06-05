import { findObject } from "../../../../inline-loops.macro";

const firstEven = findObject(object, value => {
  return value % 2 === 0;
});
