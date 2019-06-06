import { filterObject } from "../../../../src/inline-loops.macro";

const onlyEven = filterObject(object, value => {
  return value % 2 === 0;
});
