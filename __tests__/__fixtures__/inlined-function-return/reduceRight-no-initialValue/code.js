import { reduceRight } from '../../../../src/inline-loops.macro';

const sum = reduceRight(array, function(total, value) {
	return total + value;
});
