import { filter } from "../../../../src/inline-loops.macro";

const onlyEven = filter(array, value => {
  return value % 2 === 0;
});
