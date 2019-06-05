import { every } from "../../../../inline-loops.macro";

const areAllEven = every(array, function(value) {
  return value % 2 === 0;
});
