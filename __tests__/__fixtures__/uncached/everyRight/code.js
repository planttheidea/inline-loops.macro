import { everyRight } from "../../../../src/inline-loops.macro";

const areAllEven = everyRight(array, value => value % 2 === 0);
