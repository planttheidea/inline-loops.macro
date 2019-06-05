const { every, everyObject, everyRight } = require("../../inline-loops.macro");

const ARRAY = [1, 2, 3, 4, 5, 6];
const OBJECT = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };

const isEven = value => value % 2 === 0;
const isPositive = value => value > 0;

module.exports = {
  cached: {
    decrementing: {
      false: everyRight(ARRAY, isEven),
      true: everyRight(ARRAY, isPositive)
    },
    object: {
      false: everyObject(OBJECT, isEven),
      true: everyObject(OBJECT, isPositive)
    },
    standard: {
      false: every(ARRAY, isEven),
      true: every(ARRAY, isPositive)
    }
  },
  inlinedArrowExpression: {
    decrementing: {
      false: everyRight(ARRAY, value => value % 2 === 0),
      true: everyRight(ARRAY, value => value > 0)
    },
    object: {
      false: everyObject(OBJECT, value => value % 2 === 0),
      true: everyObject(OBJECT, value => value > 0)
    },
    standard: {
      false: every(ARRAY, value => value % 2 === 0),
      true: every(ARRAY, value => value > 0)
    }
  },
  inlinedArrowReturn: {
    decrementing: {
      false: everyRight(ARRAY, value => {
        return value % 2 === 0;
      }),
      true: everyRight(ARRAY, value => {
        return value > 0;
      })
    },
    object: {
      false: everyObject(OBJECT, value => {
        return value % 2 === 0;
      }),
      true: everyObject(OBJECT, value => {
        return value > 0;
      })
    },
    standard: {
      false: every(ARRAY, value => {
        return value % 2 === 0;
      }),
      true: every(ARRAY, value => {
        return value > 0;
      })
    }
  },
  inlinedFunctionReturn: {
    decrementing: {
      false: everyRight(ARRAY, function(value) {
        return value % 2 === 0;
      }),
      true: everyRight(ARRAY, function(value) {
        return value > 0;
      })
    },
    object: {
      false: everyObject(OBJECT, function(value) {
        return value % 2 === 0;
      }),
      true: everyObject(OBJECT, function(value) {
        return value > 0;
      })
    },
    standard: {
      false: every(ARRAY, function(value) {
        return value % 2 === 0;
      }),
      true: every(ARRAY, function(value) {
        return value > 0;
      })
    }
  },
  uncached: {
    decrementing: {
      false: everyRight([].concat(ARRAY), value => {
        const isEven = value % 2 === 0;

        return isEven;
      }),
      true: everyRight([].concat(ARRAY), value => {
        const isPositive = value > 0;

        return isPositive;
      })
    },
    object: {
      false: everyObject(Object.assign({}, OBJECT), value => {
        const isEven = value % 2 === 0;

        return isEven;
      }),
      true: everyObject(Object.assign({}, OBJECT), value => {
        const isPositive = value > 0;

        return isPositive;
      })
    },
    standard: {
      false: every([].concat(ARRAY), value => {
        const isEven = value % 2 === 0;

        return isEven;
      }),
      true: every([].concat(ARRAY), value => {
        const isPositive = value > 0;

        return isPositive;
      })
    }
  }
};
