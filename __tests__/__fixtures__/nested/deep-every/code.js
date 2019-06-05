import { every } from "../../../../inline-loops.macro";

if (
  `${every(array, value => value > 0)}|${every(
    array,
    value => value === ~~value
  )}` === "true|true"
) {
  console.log("I am positive and an integer!");
}
