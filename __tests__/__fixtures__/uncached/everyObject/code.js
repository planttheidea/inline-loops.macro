import { everyObject } from "../../../../src/inline-loops.macro";

const areAllEven = everyObject({ one: 1, two: 2, three: 3, four: 4 }, value => {
  const isValueEven = value % 2 === 0;

  return isValueEven;
});
