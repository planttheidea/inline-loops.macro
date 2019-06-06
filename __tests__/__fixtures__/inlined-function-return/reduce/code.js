import { reduce } from '../../../../src/inline-loops.macro';

const sum = reduce(array, function(total, value) {
	return total + value;
}, 0);
