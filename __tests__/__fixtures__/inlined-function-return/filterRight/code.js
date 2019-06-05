import { filterRight } from "../../../../inline-loops.macro";

const onlyEven = filterRight(array, function(value) {
  return value % 2 === 0;
});
