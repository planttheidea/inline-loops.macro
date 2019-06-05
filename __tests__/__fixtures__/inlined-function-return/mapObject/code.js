import { mapObject } from "../../../../inline-loops.macro";

const doubledValues = mapObject(object, function(value) {
  return value * 2;
});
