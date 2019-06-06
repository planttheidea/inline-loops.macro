import { filter } from "../../../../src/inline-loops.macro";

const onlyEven = filter(array, function(value) {
  return value % 2 === 0;
});
