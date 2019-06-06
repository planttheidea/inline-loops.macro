import { mapObject } from "../../../../src/inline-loops.macro";

const doubledValues = mapObject(object, value => {
  return value * 2;
});
