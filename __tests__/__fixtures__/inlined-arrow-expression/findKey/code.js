import { findKey } from "../../../../inline-loops.macro";

const firstEven = findKey(object, value => value % 2 === 0);
