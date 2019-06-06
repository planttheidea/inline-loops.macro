import { everyObject } from "../../../../src/inline-loops.macro";

const areAllEven = everyObject(object, value => value % 2 === 0);
