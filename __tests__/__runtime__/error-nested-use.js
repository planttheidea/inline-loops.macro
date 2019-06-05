const { forEach, map } = require("../../inline-loops.macro");

const array = [1, 2, 3, 4];

module.exports = function() {
  forEach(map(array, value => value * 2), value => console.log(value));
};
