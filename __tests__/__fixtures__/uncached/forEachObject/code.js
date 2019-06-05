import { forEachObject } from "../../../../inline-loops.macro";

forEachObject({ one: 1, two: 2, three: 3, four: 4 }, value => {
  const isValueEven = value % 2 === 0;

  return isValueEven;
});
