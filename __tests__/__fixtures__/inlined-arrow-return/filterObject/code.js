import { filterObject } from "../../../../inline-loops.macro";

const onlyEven = filterObject(object, value => {
  return value % 2 === 0;
});
