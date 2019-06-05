import { some } from "../../../../inline-loops.macro";

const areAnyEven = some(array, function(value) {
  return value % 2 === 0;
});
