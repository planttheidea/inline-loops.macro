import { find } from "../../../../src/inline-loops.macro";

const firstEven = find(array, function(value) {
  return value % 2 === 0;
});
