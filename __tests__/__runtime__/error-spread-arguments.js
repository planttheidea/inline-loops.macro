const { map } = require('../../inline-loops.macro');

const fn = v => typeof v === 'number';
const args = [[1, 2, 3], fn];

map(...args);
