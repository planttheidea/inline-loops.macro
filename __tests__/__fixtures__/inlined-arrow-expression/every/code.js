import { every } from "../../../../src/inline-loops.macro";

const areAllEven = every(array, value => value % 2 === 0);
