import { map } from "../../../../src/inline-loops.macro";

const doubledValues = map([1, 2, 3, 4], value => {
  const doubled = value * 2;

  return doubled;
});
