import { filterObject } from "../../../../src/inline-loops.macro";

const onlyEven = filterObject(object, function(value) {
  return value % 2 === 0;
});
