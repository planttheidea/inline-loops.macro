import { filterObject } from "../../../../inline-loops.macro";

const onlyEven = filterObject(object, function(value) {
  return value % 2 === 0;
});
