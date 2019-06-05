import { filterObject } from "../../../../inline-loops.macro";

const onlyEven = filterObject(object, value => value % 2 === 0);
