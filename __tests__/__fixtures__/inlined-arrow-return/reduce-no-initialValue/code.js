import { reduce } from '../../../../src/inline-loops.macro';

const sum = reduce(array, (total, value) => {
	return total + value;
});
