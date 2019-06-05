import { some } from "../../../../inline-loops.macro";

const areAnyEven = some(array, value => {
  return value % 2 === 0;
});
