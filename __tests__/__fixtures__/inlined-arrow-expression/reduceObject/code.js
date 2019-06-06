import { reduceObject } from '../../../../src/inline-loops.macro';

const sum = reduceObject(object, (total, value) => total + value, 0);
