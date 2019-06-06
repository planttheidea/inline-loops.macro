import { reduceRight } from '../../../../src/inline-loops.macro';

const sum = reduceRight(array, (total, value) => total + value);
