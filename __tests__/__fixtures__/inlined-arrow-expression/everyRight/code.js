import { everyRight } from "../../../../inline-loops.macro";

const areAllEven = everyRight(array, value => value % 2 === 0);
