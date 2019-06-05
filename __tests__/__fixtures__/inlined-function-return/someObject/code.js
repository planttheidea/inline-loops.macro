import { someObject } from "../../../../inline-loops.macro";

const areAnyEven = someObject(object, function(value) {
  return value % 2 === 0;
});
