import { findObject } from "../../../../src/inline-loops.macro";

const firstEven = findObject({ one: 1, two: 2, three: 3, four: 4 }, value => {
  const isValueEven = value % 2 === 0;

  return isValueEven;
});
