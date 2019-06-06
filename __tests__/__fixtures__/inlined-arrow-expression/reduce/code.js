import { reduce } from '../../../../src/inline-loops.macro';

const sum = reduce(array, (total, value) => total + value, 0);
