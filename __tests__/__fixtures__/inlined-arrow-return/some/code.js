import { some } from "../../../../src/inline-loops.macro";

const areAnyEven = some(array, value => {
  return value % 2 === 0;
});
