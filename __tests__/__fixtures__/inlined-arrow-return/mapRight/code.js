import { mapRight } from "../../../../inline-loops.macro";

const doubledValues = mapRight(array, value => {
  return value * 2;
});
