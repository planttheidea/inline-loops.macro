import { findKey } from "../../../../inline-loops.macro";

const firstEven = findKey(object, value => {
  return value % 2 === 0;
});
