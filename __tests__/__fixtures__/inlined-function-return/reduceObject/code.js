import { reduceObject } from '../../../../src/inline-loops.macro';

const sum = reduceObject(object, function(total, value) {
	return total + value;
}, 0);
