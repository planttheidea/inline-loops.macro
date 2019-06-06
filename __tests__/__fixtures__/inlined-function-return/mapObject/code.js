import { mapObject } from "../../../../src/inline-loops.macro";

const doubledValues = mapObject(object, function(value) {
  return value * 2;
});
