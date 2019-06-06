import { reduceRight } from "../../../../src/inline-loops.macro";

const doubledValues = reduceRight([1, 2, 3, 4], (agg, value, index) => {
  agg[index] = value * 2;

  return agg;
});
