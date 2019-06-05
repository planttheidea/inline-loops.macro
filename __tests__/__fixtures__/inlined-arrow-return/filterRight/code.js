import { filterRight } from "../../../../inline-loops.macro";

const onlyEven = filterRight(array, value => {
  return value % 2 === 0;
});
