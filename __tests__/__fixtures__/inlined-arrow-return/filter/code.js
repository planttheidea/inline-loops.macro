import { filter } from "../../../../inline-loops.macro";

const onlyEven = filter(array, value => {
  return value % 2 === 0;
});
