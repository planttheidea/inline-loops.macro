import { reduceObject } from '../../../../src/inline-loops.macro';

const sum = reduceObject(object, (total, value) => {
	return total + value;
}, 0);
