import { every } from "../../../../inline-loops.macro";

if (every(array, value => value > 0)) {
  console.log("I am positive!");
}
