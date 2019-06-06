import { everyRight } from "../../../../src/inline-loops.macro";

const areAllEven = everyRight(array, function(value) {
  return value % 2 === 0;
});
