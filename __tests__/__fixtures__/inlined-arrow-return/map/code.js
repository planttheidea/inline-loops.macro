import { map } from "../../../../inline-loops.macro";

const doubledValues = map(array, value => {
  return value * 2;
});
