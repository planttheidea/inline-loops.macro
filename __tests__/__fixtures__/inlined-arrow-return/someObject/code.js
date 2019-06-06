import { someObject } from "../../../../src/inline-loops.macro";

const areAnyEven = someObject(object, value => {
  return value % 2 === 0;
});
