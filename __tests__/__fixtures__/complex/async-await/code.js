import { find } from '../../../../src/inline-loops.macro';

async function getStuff(promises) {
  return await find(promises, (promise) => !!promise);
}
