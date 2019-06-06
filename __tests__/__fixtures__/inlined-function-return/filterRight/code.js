import { filterRight } from "../../../../src/inline-loops.macro";

const onlyEven = filterRight(array, function(value) {
  return value % 2 === 0;
});
