const {
  findIndex,
  findIndexRight,
  findKey
} = require("../../src/inline-loops.macro");

const { deepEqual: isEqual } = require("fast-equals");

const ARRAY = [1, 2, 3, 4, 5, 6];
const OBJECT = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };

const isEven = value => value % 2 === 0;

const BAD_DECREMENTING_ARRAY_RESULT = 1;
const DECREMENTING_ARRAY_RESULT = 5;

const BAD_ARRAY_RESULT = 5;
const ARRAY_RESULT = ARRAY.findIndex(isEven);

const BAD_OBJECT_RESULT = "six";
const OBJECT_RESULT = "two";

module.exports = {
  cached: {
    decrementing: {
      false: isEqual(
        findIndexRight(ARRAY, isEven),
        BAD_DECREMENTING_ARRAY_RESULT
      ),
      true: isEqual(findIndexRight(ARRAY, isEven), DECREMENTING_ARRAY_RESULT)
    },
    object: {
      false: isEqual(findKey(OBJECT, isEven), BAD_OBJECT_RESULT),
      true: isEqual(findKey(OBJECT, isEven), OBJECT_RESULT)
    },
    standard: {
      false: isEqual(findIndex(ARRAY, isEven), BAD_ARRAY_RESULT),
      true: isEqual(findIndex(ARRAY, isEven), ARRAY_RESULT)
    }
  },
  inlinedArrowExpression: {
    decrementing: {
      false: isEqual(
        findIndexRight(ARRAY, value => value % 2 === 0),
        BAD_DECREMENTING_ARRAY_RESULT
      ),
      true: isEqual(
        findIndexRight(ARRAY, value => value % 2 === 0),
        DECREMENTING_ARRAY_RESULT
      )
    },
    object: {
      false: isEqual(
        findKey(OBJECT, value => value % 2 === 0),
        BAD_OBJECT_RESULT
      ),
      true: isEqual(findKey(OBJECT, value => value % 2 === 0), OBJECT_RESULT)
    },
    standard: {
      false: isEqual(findIndex(ARRAY, value => value % 2 === 0), ARRAY),
      true: isEqual(findIndex(ARRAY, value => value % 2 === 0), ARRAY_RESULT)
    }
  },
  inlinedArrowReturn: {
    decrementing: {
      false: isEqual(
        findIndexRight(ARRAY, value => {
          return value % 2 === 0;
        }),
        BAD_DECREMENTING_ARRAY_RESULT
      ),
      true: isEqual(
        findIndexRight(ARRAY, value => {
          return value % 2 === 0;
        }),
        DECREMENTING_ARRAY_RESULT
      )
    },
    object: {
      false: isEqual(
        findKey(OBJECT, value => {
          return value % 2 === 0;
        }),
        BAD_OBJECT_RESULT
      ),
      true: isEqual(
        findKey(OBJECT, value => {
          return value % 2 === 0;
        }),
        OBJECT_RESULT
      )
    },
    standard: {
      false: isEqual(
        findIndex(ARRAY, value => {
          return value % 2 === 0;
        }),
        BAD_ARRAY_RESULT
      ),
      true: isEqual(
        findIndex(ARRAY, value => {
          return value % 2 === 0;
        }),
        ARRAY_RESULT
      )
    }
  },
  inlinedFunctionReturn: {
    decrementing: {
      false: isEqual(
        findIndexRight(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        BAD_DECREMENTING_ARRAY_RESULT
      ),
      true: isEqual(
        findIndexRight(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        DECREMENTING_ARRAY_RESULT
      )
    },
    object: {
      false: isEqual(
        findKey(OBJECT, function(value) {
          return value % 2 === 0;
        }),
        BAD_OBJECT_RESULT
      ),
      true: isEqual(
        findKey(OBJECT, function(value) {
          return value % 2 === 0;
        }),
        OBJECT_RESULT
      )
    },
    standard: {
      false: isEqual(
        findIndex(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        BAD_ARRAY_RESULT
      ),
      true: isEqual(
        findIndex(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        ARRAY_RESULT
      )
    }
  },
  uncached: {
    decrementing: {
      false: isEqual(
        findIndexRight([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        BAD_DECREMENTING_ARRAY_RESULT
      ),
      true: isEqual(
        findIndexRight([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        DECREMENTING_ARRAY_RESULT
      )
    },
    object: {
      false: isEqual(
        findKey(Object.assign({}, OBJECT), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        BAD_OBJECT_RESULT
      ),
      true: isEqual(
        findKey(Object.assign({}, OBJECT), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        OBJECT_RESULT
      )
    },
    standard: {
      false: isEqual(
        findIndex([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        BAD_ARRAY_RESULT
      ),
      true: isEqual(
        findIndex([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        ARRAY_RESULT
      )
    }
  }
};
