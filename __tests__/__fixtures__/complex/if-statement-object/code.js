import { mapObject } from '../../../../src/inline-loops.macro';

function getStuff(object, foo) {
  if (foo === 'bar') {
    const state = {
      ...state,
      foo,
    };

    return mapObject(object, (v) => v * 2);
  }

  return object;
}
