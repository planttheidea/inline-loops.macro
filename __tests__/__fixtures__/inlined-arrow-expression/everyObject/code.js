import { everyObject } from "../../../../inline-loops.macro";

const areAllEven = everyObject(object, value => value % 2 === 0);
