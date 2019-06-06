import { some } from "../../../../src/inline-loops.macro";

const areAnyEven = some(array, value => value % 2 === 0);
