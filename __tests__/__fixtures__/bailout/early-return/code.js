import { filter } from '../../../../src/inline-loops.macro';

function getFoo(config) {
  const collection = config.collection || [1, 2, 3];

  return filter(collection, (value) => {
    if (value === 2) {
      return true;
    }
  });
}
