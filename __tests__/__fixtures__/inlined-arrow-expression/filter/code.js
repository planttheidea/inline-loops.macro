import { filter } from "../../../../src/inline-loops.macro";

const onlyEven = filter(array, value => value % 2 === 0);
