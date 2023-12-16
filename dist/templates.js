"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTemplates = createTemplates;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29;
function createTemplates(_ref) {
  var template = _ref.template;
  var every = template(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n    let DETERMINATION = true;\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (!RESULT) {\n        DETERMINATION = false;\n        break;\n      }\n    }\n"])));
  var everyObject = template(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n    let DETERMINATION = true,\n        VALUE,\n        RESULT;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (!RESULT) {\n        DETERMINATION = false;\n        break;\n      }\n\t}\n"])));
  var everyRight = template(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n    let DETERMINATION = true;\n    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (!RESULT) {\n        DETERMINATION = false;\n        break;\n      }\n    }\n"])));
  var filter = template(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n    const RESULTS = [];\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        RESULTS.push(VALUE);\n      }\n    }\n"])));
  var filterObject = template(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2["default"])(["\n    const RESULTS = {};\n    let RESULT,\n        VALUE;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        RESULTS[KEY] = VALUE;\n      }\n    }\n"])));
  var filterRight = template(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2["default"])(["\n    const RESULTS = [];\n    let RESULT,\n        VALUE;\n    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        RESULTS.push(VALUE);\n      }\n    }\n"])));
  var find = template(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2["default"])(["\n    let MATCH;\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        MATCH = VALUE;\n        break;\n      }\n    }\n"])));
  var findObject = template(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2["default"])(["\n    let MATCH,\n        VALUE,\n        RESULT;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        MATCH = VALUE;\n        break;\n      }\n    }\n"])));
  var findLast = template(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2["default"])(["\n    let MATCH;\n    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        MATCH = VALUE;\n        break;\n      }\n    }\n"])));
  var findIndex = template(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2["default"])(["\n    let MATCH = -1;\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        MATCH = KEY;\n        break;\n      }\n    }\n"])));
  var findKey = template(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2["default"])(["\n    let MATCH = -1,\n        VALUE,\n        RESULT;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        MATCH = KEY;\n        break;\n      }\n    }\n"])));
  var findLastIndex = template(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2["default"])(["\n    let MATCH = -1;\n    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        MATCH = KEY;\n        break;\n      }\n    }\n"])));
  var flatMap = template(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2["default"])(["\n    let RESULTS = [];\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n      RESULTS = RESULTS.concat(RESULT);\n    }\n"])));
  var flatMapRight = template(_templateObject14 || (_templateObject14 = (0, _taggedTemplateLiteral2["default"])(["\n    let RESULTS = [];\n    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n      RESULTS = RESULTS.concat(RESULT);\n    }\n"])));
  var forEach = template(_templateObject15 || (_templateObject15 = (0, _taggedTemplateLiteral2["default"])(["\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n    }\n"])));
  var forEachObject = template(_templateObject16 || (_templateObject16 = (0, _taggedTemplateLiteral2["default"])(["\n    let VALUE;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n    }\n"])));
  var forEachRight = template(_templateObject17 || (_templateObject17 = (0, _taggedTemplateLiteral2["default"])([" \n    for (let KEY = COLLECTION.length, VALUE; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n    }\n"])));
  var localVariable = template(_templateObject18 || (_templateObject18 = (0, _taggedTemplateLiteral2["default"])(["\n  const LOCAL = VALUE;\n"])));
  var iife = template(_templateObject19 || (_templateObject19 = (0, _taggedTemplateLiteral2["default"])(["\n  (() => {\n    BODY\n  })();\n"])));
  var map = template(_templateObject20 || (_templateObject20 = (0, _taggedTemplateLiteral2["default"])(["\n    const LENGTH = COLLECTION.length;\n    const RESULTS = Array(LENGTH);\n\tfor (let KEY = 0, VALUE; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULTS[KEY] = LOGIC;\n    }\n"])));
  var mapObject = template(_templateObject21 || (_templateObject21 = (0, _taggedTemplateLiteral2["default"])(["\n    const RESULTS = {};\n    let VALUE,\n        RESULT;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULTS[KEY] = LOGIC;\n    }\n"])));
  var mapRight = template(_templateObject22 || (_templateObject22 = (0, _taggedTemplateLiteral2["default"])(["\n    const LENGTH = COLLECTION.length;\n    let KEY = LENGTH;\n    const RESULTS = Array(LENGTH);\n    for (let VALUE; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULTS[LENGTH - KEY - 1] = LOGIC;\n    }\n"])));
  var nthLastItem = template(_templateObject23 || (_templateObject23 = (0, _taggedTemplateLiteral2["default"])(["\n  COLLECTION[COLLECTION.length - COUNT]\n"])));
  var reduce = template(_templateObject24 || (_templateObject24 = (0, _taggedTemplateLiteral2["default"])(["\n    let ACCUMULATED = INITIAL;\n    for (let KEY = START, LENGTH = COLLECTION.length, VALUE; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      ACCUMULATED = LOGIC;\n    }\n"])));
  var reduceObject = template(_templateObject25 || (_templateObject25 = (0, _taggedTemplateLiteral2["default"])(["\n    let SKIP = SHOULD_SKIP,\n        ACCUMULATED = INITIAL,\n        VALUE;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n\n      if (SKIP) {\n        ACCUMULATED = VALUE;\n        SKIP = false;\n        continue;\n      }\n\n      BODY\n      ACCUMULATED = LOGIC;\n    }\n"])));
  var reduceRight = template(_templateObject26 || (_templateObject26 = (0, _taggedTemplateLiteral2["default"])(["\n    let ACCUMULATED = INITIAL;\n    for (let KEY = COLLECTION.length - START, VALUE; --KEY >= START;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      ACCUMULATED = LOGIC;\n    }\n"])));
  var some = template(_templateObject27 || (_templateObject27 = (0, _taggedTemplateLiteral2["default"])(["\n    let DETERMINATION = false;\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        DETERMINATION = true;\n        break;\n      }\n    }\n"])));
  var someObject = template(_templateObject28 || (_templateObject28 = (0, _taggedTemplateLiteral2["default"])(["\n    let DETERMINATION = false,\n        VALUE,\n        RESULT;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        DETERMINATION = true;\n        break;\n      }\n    }\n"])));
  var someRight = template(_templateObject29 || (_templateObject29 = (0, _taggedTemplateLiteral2["default"])(["\n    const DETERMINATION = false;\n    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        DETERMINATION = true;\n        break;\n      }\n    }\n"])));
  return {
    every: every,
    everyObject: everyObject,
    everyRight: everyRight,
    filter: filter,
    filterObject: filterObject,
    filterRight: filterRight,
    find: find,
    findIndex: findIndex,
    findKey: findKey,
    findLast: findLast,
    findLastIndex: findLastIndex,
    findObject: findObject,
    flatMap: flatMap,
    flatMapRight: flatMapRight,
    forEach: forEach,
    forEachObject: forEachObject,
    forEachRight: forEachRight,
    iife: iife,
    localVariable: localVariable,
    map: map,
    mapObject: mapObject,
    mapRight: mapRight,
    nthLastItem: nthLastItem,
    reduce: reduce,
    reduceObject: reduceObject,
    reduceRight: reduceRight,
    some: some,
    someObject: someObject,
    someRight: someRight
  };
}