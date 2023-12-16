"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _babelPluginMacros = require("babel-plugin-macros");
var _handlers = require("./handlers");
function inlineLoopsMacro(_ref) {
  var references = _ref.references,
    babel = _ref.babel;
  var _references$every = references.every,
    every = _references$every === void 0 ? [] : _references$every,
    _references$everyObje = references.everyObject,
    everyObject = _references$everyObje === void 0 ? [] : _references$everyObje,
    _references$everyRigh = references.everyRight,
    everyRight = _references$everyRigh === void 0 ? [] : _references$everyRigh,
    _references$filter = references.filter,
    filter = _references$filter === void 0 ? [] : _references$filter,
    _references$filterObj = references.filterObject,
    filterObject = _references$filterObj === void 0 ? [] : _references$filterObj,
    _references$filterRig = references.filterRight,
    filterRight = _references$filterRig === void 0 ? [] : _references$filterRig,
    _references$find = references.find,
    find = _references$find === void 0 ? [] : _references$find,
    _references$findObjec = references.findObject,
    findObject = _references$findObjec === void 0 ? [] : _references$findObjec,
    _references$findLast = references.findLast,
    findLast = _references$findLast === void 0 ? [] : _references$findLast,
    _references$findIndex = references.findIndex,
    findIndex = _references$findIndex === void 0 ? [] : _references$findIndex,
    _references$findKey = references.findKey,
    findKey = _references$findKey === void 0 ? [] : _references$findKey,
    _references$findLastI = references.findLastIndex,
    findLastIndex = _references$findLastI === void 0 ? [] : _references$findLastI,
    _references$flatMap = references.flatMap,
    flatMap = _references$flatMap === void 0 ? [] : _references$flatMap,
    _references$flatMapRi = references.flatMapRight,
    flatMapRight = _references$flatMapRi === void 0 ? [] : _references$flatMapRi,
    _references$forEach = references.forEach,
    forEach = _references$forEach === void 0 ? [] : _references$forEach,
    _references$forEachOb = references.forEachObject,
    forEachObject = _references$forEachOb === void 0 ? [] : _references$forEachOb,
    _references$forEachRi = references.forEachRight,
    forEachRight = _references$forEachRi === void 0 ? [] : _references$forEachRi,
    _references$map = references.map,
    map = _references$map === void 0 ? [] : _references$map,
    _references$mapObject = references.mapObject,
    mapObject = _references$mapObject === void 0 ? [] : _references$mapObject,
    _references$mapRight = references.mapRight,
    mapRight = _references$mapRight === void 0 ? [] : _references$mapRight,
    _references$reduce = references.reduce,
    reduce = _references$reduce === void 0 ? [] : _references$reduce,
    _references$reduceObj = references.reduceObject,
    reduceObject = _references$reduceObj === void 0 ? [] : _references$reduceObj,
    _references$reduceRig = references.reduceRight,
    reduceRight = _references$reduceRig === void 0 ? [] : _references$reduceRig,
    _references$some = references.some,
    some = _references$some === void 0 ? [] : _references$some,
    _references$someObjec = references.someObject,
    someObject = _references$someObjec === void 0 ? [] : _references$someObjec,
    _references$someRight = references.someRight,
    someRight = _references$someRight === void 0 ? [] : _references$someRight;
  var handlers = (0, _handlers.createHandlers)(babel);
  every.forEach(handlers.every);
  everyObject.forEach(handlers.everyObject);
  everyRight.forEach(handlers.everyRight);
  filter.forEach(handlers.filter);
  filterObject.forEach(handlers.filterObject);
  filterRight.forEach(handlers.filterRight);
  forEach.forEach(handlers.forEach);
  forEachObject.forEach(handlers.forEachObject);
  forEachRight.forEach(handlers.forEachRight);
  find.forEach(handlers.find);
  findObject.forEach(handlers.findObject);
  findLast.forEach(handlers.findLast);
  findIndex.forEach(handlers.findIndex);
  findKey.forEach(handlers.findKey);
  findLastIndex.forEach(handlers.findLastIndex);
  flatMap.forEach(handlers.flatMap);
  flatMapRight.forEach(handlers.flatMapRight);
  map.forEach(handlers.map);
  mapObject.forEach(handlers.mapObject);
  mapRight.forEach(handlers.mapRight);
  reduce.forEach(handlers.reduce);
  reduceObject.forEach(handlers.reduceObject);
  reduceRight.forEach(handlers.reduceRight);
  some.forEach(handlers.some);
  someObject.forEach(handlers.someObject);
  someRight.forEach(handlers.someRight);
}
var _default = exports["default"] = (0, _babelPluginMacros.createMacro)(inlineLoopsMacro);