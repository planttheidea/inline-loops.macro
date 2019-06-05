import { everyObject } from "../../../../inline-loops.macro";

const areAllEven = everyObject(object, function(value) {
  return value % 2 === 0;
});
