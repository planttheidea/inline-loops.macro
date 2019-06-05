import { findIndex } from "../../../../inline-loops.macro";

const firstEven = findIndex([1, 2, 3, 4], value => {
  const isValueEven = value % 2 === 0;

  return isValueEven;
});
