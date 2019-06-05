const { find, findObject, findRight } = require("../../inline-loops.macro");

const { deepEqual: isEqual } = require("fast-equals");

const ARRAY = [1, 2, 3, 4, 5, 6];
const OBJECT = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };

const isEven = value => value % 2 === 0;

const BAD_DECREMENTING_ARRAY_RESULT = 2;
const DECREMENTING_ARRAY_RESULT = 6;

const BAD_ARRAY_RESULT = 6;
const ARRAY_RESULT = ARRAY.find(isEven);

const BAD_OBJECT_RESULT = 6;
const OBJECT_RESULT = 2;

module.exports = {
  cached: {
    decrementing: {
      false: isEqual(findRight(ARRAY, isEven), BAD_DECREMENTING_ARRAY_RESULT),
      true: isEqual(findRight(ARRAY, isEven), DECREMENTING_ARRAY_RESULT)
    },
    object: {
      false: isEqual(findObject(OBJECT, isEven), BAD_OBJECT_RESULT),
      true: isEqual(findObject(OBJECT, isEven), OBJECT_RESULT)
    },
    standard: {
      false: isEqual(find(ARRAY, isEven), BAD_ARRAY_RESULT),
      true: isEqual(find(ARRAY, isEven), ARRAY_RESULT)
    }
  },
  inlinedArrowExpression: {
    decrementing: {
      false: isEqual(
        findRight(ARRAY, value => value % 2 === 0),
        BAD_DECREMENTING_ARRAY_RESULT
      ),
      true: isEqual(
        findRight(ARRAY, value => value % 2 === 0),
        DECREMENTING_ARRAY_RESULT
      )
    },
    object: {
      false: isEqual(
        findObject(OBJECT, value => value % 2 === 0),
        BAD_OBJECT_RESULT
      ),
      true: isEqual(findObject(OBJECT, value => value % 2 === 0), OBJECT_RESULT)
    },
    standard: {
      false: isEqual(find(ARRAY, value => value % 2 === 0), ARRAY),
      true: isEqual(find(ARRAY, value => value % 2 === 0), ARRAY_RESULT)
    }
  },
  inlinedArrowReturn: {
    decrementing: {
      false: isEqual(
        findRight(ARRAY, value => {
          return value % 2 === 0;
        }),
        BAD_DECREMENTING_ARRAY_RESULT
      ),
      true: isEqual(
        findRight(ARRAY, value => {
          return value % 2 === 0;
        }),
        DECREMENTING_ARRAY_RESULT
      )
    },
    object: {
      false: isEqual(
        findObject(OBJECT, value => {
          return value % 2 === 0;
        }),
        BAD_OBJECT_RESULT
      ),
      true: isEqual(
        findObject(OBJECT, value => {
          return value % 2 === 0;
        }),
        OBJECT_RESULT
      )
    },
    standard: {
      false: isEqual(
        find(ARRAY, value => {
          return value % 2 === 0;
        }),
        BAD_ARRAY_RESULT
      ),
      true: isEqual(
        find(ARRAY, value => {
          return value % 2 === 0;
        }),
        ARRAY_RESULT
      )
    }
  },
  inlinedFunctionReturn: {
    decrementing: {
      false: isEqual(
        findRight(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        BAD_DECREMENTING_ARRAY_RESULT
      ),
      true: isEqual(
        findRight(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        DECREMENTING_ARRAY_RESULT
      )
    },
    object: {
      false: isEqual(
        findObject(OBJECT, function(value) {
          return value % 2 === 0;
        }),
        BAD_OBJECT_RESULT
      ),
      true: isEqual(
        findObject(OBJECT, function(value) {
          return value % 2 === 0;
        }),
        OBJECT_RESULT
      )
    },
    standard: {
      false: isEqual(
        find(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        BAD_ARRAY_RESULT
      ),
      true: isEqual(
        find(ARRAY, function(value) {
          return value % 2 === 0;
        }),
        ARRAY_RESULT
      )
    }
  },
  uncached: {
    decrementing: {
      false: isEqual(
        findRight([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        BAD_DECREMENTING_ARRAY_RESULT
      ),
      true: isEqual(
        findRight([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        DECREMENTING_ARRAY_RESULT
      )
    },
    object: {
      false: isEqual(
        findObject(Object.assign({}, OBJECT), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        BAD_OBJECT_RESULT
      ),
      true: isEqual(
        findObject(Object.assign({}, OBJECT), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        OBJECT_RESULT
      )
    },
    standard: {
      false: isEqual(
        find([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        BAD_ARRAY_RESULT
      ),
      true: isEqual(
        find([].concat(ARRAY), value => {
          const isEven = value % 2 === 0;

          return isEven;
        }),
        ARRAY_RESULT
      )
    }
  }
};
