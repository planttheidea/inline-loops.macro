import { reduceObject } from "../../../../src/inline-loops.macro";

const doubledValues = reduceObject(
  { one: 1, two: 2, three: 3, four: 4 },
  (agg, value, index) => {
    agg[index] = value * 2;

    return agg;
  }
);
