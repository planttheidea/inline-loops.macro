import { someRight } from "../../../../src/inline-loops.macro";

const areAnyEven = someRight([1, 2, 3, 4], value => {
  const isValueEven = value % 2 === 0;

  return isValueEven;
});
