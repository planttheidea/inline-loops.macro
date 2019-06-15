import { flatMapRight } from '../../../../src/inline-loops.macro';

const flattened = flatMapRight([['foo', 'bar'], ['bar', 'baz']], (entry) => {
  const [first] = entry;

  return [first];
});
