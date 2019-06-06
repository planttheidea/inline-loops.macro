import { mapRight } from "../../../../src/inline-loops.macro";

const doubledValues = mapRight([1, 2, 3, 4], value => {
  const doubled = value * 2;

  return doubled;
});
