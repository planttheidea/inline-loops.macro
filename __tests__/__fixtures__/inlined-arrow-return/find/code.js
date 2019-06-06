import { find } from "../../../../src/inline-loops.macro";

const firstEven = find(array, value => {
  return value % 2 === 0;
});
