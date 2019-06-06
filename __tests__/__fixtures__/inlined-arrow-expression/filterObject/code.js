import { filterObject } from "../../../../src/inline-loops.macro";

const onlyEven = filterObject(object, value => value % 2 === 0);
