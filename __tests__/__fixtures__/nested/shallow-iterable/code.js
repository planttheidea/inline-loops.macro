import { every, map } from '../../../../inline-loops.macro';

const allStrings = map(array, item => every(item, v => typeof v === 'string'));
