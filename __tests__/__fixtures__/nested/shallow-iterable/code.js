import { every, map } from '../../../../src/inline-loops.macro';

const allStrings = map(array, item => every(item, v => typeof v === 'string'));
