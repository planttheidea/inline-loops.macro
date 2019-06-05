import { someObject } from "../../../../inline-loops.macro";

const areAnyEven = someObject(object, value => {
  return value % 2 === 0;
});
