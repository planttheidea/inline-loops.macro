import { map } from "../../../../inline-loops.macro";
import { deepEqual } from "fast-equals";

const isEqual = deepEqual(map(array, cachedFn), [1, 2, 3]);
