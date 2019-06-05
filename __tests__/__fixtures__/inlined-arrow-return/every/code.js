import { every } from "../../../../inline-loops.macro";

const areAllEven = every(array, value => {
  return value % 2 === 0;
});
