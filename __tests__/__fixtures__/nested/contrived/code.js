import { map, reduce, someObject } from '../../../../src/inline-loops.macro';

if (
  someObject(
    reduce(
      map(array, value => value * 2),
      (object, value) => ({
        ...object,
        [value]: value,
      }),
      {},
    ),
    value => value > 100,
  )
) {
  console.log('I am large!');
}
