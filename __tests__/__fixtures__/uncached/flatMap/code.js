import { flatMap } from '../../../../src/inline-loops.macro';

const flattened = flatMap([['foo', 'bar'], ['bar', 'baz']], (entry) => {
  const [first] = entry;

  return [first];
});
