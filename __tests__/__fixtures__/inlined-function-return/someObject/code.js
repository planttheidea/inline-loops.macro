import { someObject } from "../../../../src/inline-loops.macro";

const areAnyEven = someObject(object, function(value) {
  return value % 2 === 0;
});
