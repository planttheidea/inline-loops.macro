import { mapObject } from "../../../../inline-loops.macro";
import { deepEqual } from "fast-equals";

const isEqual = deepEqual(Object.values(mapObject(object, cachedFn)), [
  1,
  2,
  3
]);
