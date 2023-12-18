import type { MacroParams } from 'babel-plugin-macros';

export function createTemplates({ template }: MacroParams['babel']) {
  const every = template`
    let DETERMINATION = true;
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (!RESULT) {
        DETERMINATION = false;
        break;
      }
    }
`;

  const everyObject = template`
    let DETERMINATION = true,
        VALUE,
        RESULT;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (!RESULT) {
        DETERMINATION = false;
        break;
      }
	}
`;

  const everyRight = template`
    let DETERMINATION = true;
    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (!RESULT) {
        DETERMINATION = false;
        break;
      }
    }
`;

  const filter = template`
    const RESULTS = [];
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        RESULTS.push(VALUE);
      }
    }
`;

  const filterObject = template`
    const RESULTS = {};
    let RESULT,
        VALUE;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        RESULTS[KEY] = VALUE;
      }
    }
`;

  const filterRight = template`
    const RESULTS = [];
    let RESULT,
        VALUE;
    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        RESULTS.push(VALUE);
      }
    }
`;

  const find = template`
    let MATCH;
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        MATCH = VALUE;
        break;
      }
    }
`;

  const findObject = template`
    let MATCH,
        VALUE,
        RESULT;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        MATCH = VALUE;
        break;
      }
    }
`;

  const findLast = template`
    let MATCH;
    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        MATCH = VALUE;
        break;
      }
    }
`;

  const findIndex = template`
    let MATCH = -1;
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        MATCH = KEY;
        break;
      }
    }
`;

  const findKey = template`
    let MATCH = -1,
        VALUE,
        RESULT;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        MATCH = KEY;
        break;
      }
    }
`;

  const findLastIndex = template`
    let MATCH = -1;
    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        MATCH = KEY;
        break;
      }
    }
`;

  const flatMap = template`
    let RESULTS = [];
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;
      RESULTS = RESULTS.concat(RESULT);
    }
`;

  const flatMapRight = template`
    let RESULTS = [];
    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;
      RESULTS = RESULTS.concat(RESULT);
    }
`;

  const forEach = template`
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
    }
`;

  const forEachObject = template`
    let VALUE;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
    }
`;

  const forEachRight = template` 
    for (let KEY = COLLECTION.length, VALUE; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
    }
`;

  const localVariable = template`
  const LOCAL = VALUE;
`;

  const iife = template`
  (() => {
    BODY
  })();
`;

  const map = template`
    const LENGTH = COLLECTION.length;
    const RESULTS = Array(LENGTH);
	for (let KEY = 0, VALUE; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULTS[KEY] = LOGIC;
    }
`;

  const mapObject = template`
    const RESULTS = {};
    let VALUE;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULTS[KEY] = LOGIC;
    }
`;

  const mapRight = template`
    const LENGTH = COLLECTION.length;
    let KEY = LENGTH;
    const RESULTS = Array(LENGTH);
    for (let VALUE; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULTS[LENGTH - KEY - 1] = LOGIC;
    }
`;

  const nthLastItem = template`
  COLLECTION[COLLECTION.length - COUNT]
`;

  const reduce = template`
    let ACCUMULATED = INITIAL;
    for (let KEY = START, LENGTH = COLLECTION.length, VALUE; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      ACCUMULATED = LOGIC;
    }
`;

  const reduceObject = template`
    let SKIP = SHOULD_SKIP,
        ACCUMULATED = INITIAL,
        VALUE;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];

      if (SKIP) {
        ACCUMULATED = VALUE;
        SKIP = false;
        continue;
      }

      BODY
      ACCUMULATED = LOGIC;
    }
`;

  const reduceRight = template`
    let ACCUMULATED = INITIAL;
    for (let KEY = COLLECTION.length - START, VALUE; --KEY >= START;) {
      VALUE = COLLECTION[KEY];
      BODY
      ACCUMULATED = LOGIC;
    }
`;

  const some = template`
    let DETERMINATION = false;
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        DETERMINATION = true;
        break;
      }
    }
`;

  const someObject = template`
    let DETERMINATION = false,
        VALUE,
        RESULT;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        DETERMINATION = true;
        break;
      }
    }
`;

  const someRight = template`
    const DETERMINATION = false;
    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        DETERMINATION = true;
        break;
      }
    }
`;

  return {
    every,
    everyObject,
    everyRight,
    filter,
    filterObject,
    filterRight,
    find,
    findIndex,
    findKey,
    findLast,
    findLastIndex,
    findObject,
    flatMap,
    flatMapRight,
    forEach,
    forEachObject,
    forEachRight,
    iife,
    localVariable,
    map,
    mapObject,
    mapRight,
    nthLastItem,
    reduce,
    reduceObject,
    reduceRight,
    some,
    someObject,
    someRight,
  };
}
