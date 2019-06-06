import { findKey } from "../../../../src/inline-loops.macro";

const firstEven = findKey(object, value => value % 2 === 0);
