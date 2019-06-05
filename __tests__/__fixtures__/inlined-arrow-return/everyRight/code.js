import { everyRight } from "../../../../inline-loops.macro";

const areAllEven = everyRight(array, value => {
  return value % 2 === 0;
});
