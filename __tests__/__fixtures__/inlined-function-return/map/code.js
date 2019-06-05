import { map } from "../../../../inline-loops.macro";

const doubledValues = map(array, function(value) {
  return value * 2;
});
