import { mapObject } from "../../../../src/inline-loops.macro";

const doubledValues = mapObject({ one: 1, two: 2, three: 3, four: 4 }, value => {
  const doubled = value * 2;

  return doubled;
});
