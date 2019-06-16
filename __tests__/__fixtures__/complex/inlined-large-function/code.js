import { filter, map, reduceObject } from '../../../../src/inline-loops.macro';

const result = filter(array, (value, index) => {
  // usage inside
  const mapped = map(array, value => value * 2);

  // custom for loop with let
  for (let i = 0; i < mapped.length; i++) {
    mapped[i] = mapped[i] ** 2;
  }

  // custom for loop with var
  for (var i = 0; i < mapped.length; i++) {
    mapped[i] = mapped[i] ** 2;
  }

  // another iteration, using the mapped values
  const reduced = reduceObject(object, value => ({
    [value]: mapped,
  }));

  // custom for-in
  for (var key in reduced) {
    if (reduced[key] < 0) {
      delete reduced[key];
    }
  }

  return reduced[100];
});
