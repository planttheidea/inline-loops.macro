import { mapRight } from "../../../../inline-loops.macro";

const doubledValues = mapRight(array, function(value) {
  return value * 2;
});
