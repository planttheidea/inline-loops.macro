"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('babel-plugin-macros'),
    createMacro = _require.createMacro,
    MacroError = _require.MacroError;

var _require2 = require('./handlers'),
    handleEvery = _require2.handleEvery,
    handleFilter = _require2.handleFilter,
    handleFind = _require2.handleFind,
    handleFindKey = _require2.handleFindKey,
    handleForEach = _require2.handleForEach,
    handleMap = _require2.handleMap,
    handleReduce = _require2.handleReduce,
    handleSome = _require2.handleSome;

var METHODS = ['every', 'filter', 'find', 'findIndex', 'findKey', 'forEach', 'map', 'reduce', 'some'];
var ARRAY_ONLY_METHODS = ['findIndex'];
var OBJECT_ONLY_METHODS = ['findKey'];

function getCallTypes(references, method) {
  var isArrayOnly = ARRAY_ONLY_METHODS.includes(method);
  var isObjectOnly = OBJECT_ONLY_METHODS.includes(method);
  var decrementingMethod = "".concat(method, "Right");
  var objectMethod = isObjectOnly ? method : "".concat(method, "Object");
  var incrementingCalls = references[method] || [];
  var decrementingCalls = references[decrementingMethod] || [];
  var objectCalls = references[objectMethod] || [];
  return {
    decrementingCalls: decrementingCalls.map(function (path) {
      return {
        method: decrementingMethod,
        path: path,
        sourceMethod: method,
        type: 'decrementing'
      };
    }),
    decrementingMethod: decrementingMethod,
    incrementingCalls: incrementingCalls.map(function (path) {
      return {
        method: method,
        path: path,
        sourceMethod: method,
        type: 'incrementing'
      };
    }),
    isArrayOnly: isArrayOnly,
    isObjectOnly: isObjectOnly,
    objectCalls: objectCalls.map(function (path) {
      return {
        method: objectMethod,
        path: path,
        sourceMethod: method,
        type: 'object'
      };
    }),
    objectMethod: objectMethod
  };
}

function inlineLoops(_ref) {
  var references = _ref.references,
      babel = _ref.babel;
  var t = babel.types;
  var allMethods = [];
  METHODS.forEach(function (method) {
    var _getCallTypes = getCallTypes(references, method),
        decrementingCalls = _getCallTypes.decrementingCalls,
        incrementingCalls = _getCallTypes.incrementingCalls,
        isArrayOnly = _getCallTypes.isArrayOnly,
        isObjectOnly = _getCallTypes.isObjectOnly,
        objectCalls = _getCallTypes.objectCalls;

    if (isArrayOnly) {
      return allMethods.push.apply(allMethods, _toConsumableArray(incrementingCalls).concat(_toConsumableArray(decrementingCalls)));
    }

    if (isObjectOnly) {
      return allMethods.push.apply(allMethods, _toConsumableArray(objectCalls));
    }

    return allMethods.push.apply(allMethods, _toConsumableArray(incrementingCalls).concat(_toConsumableArray(decrementingCalls), _toConsumableArray(objectCalls)));
  });
  allMethods.forEach(function (_ref2) {
    var path = _ref2.path;
    path.node.__inlineLoopsMacro = true;
  });
  allMethods.sort(function (_ref3, _ref4) {
    var a = _ref3.path;
    var b = _ref4.path;
    var aContainer = a.container;
    var bContainer = b.container;

    if (aContainer.arguments) {
      var _aContainer$arguments = _slicedToArray(aContainer.arguments, 1),
          iterableA = _aContainer$arguments[0];

      if (t.isCallExpression(iterableA) && iterableA.callee.__inlineLoopsMacro && iterableA.callee === b.node) {
        return 1;
      }
    }

    if (bContainer.arguments) {
      var _bContainer$arguments = _slicedToArray(bContainer.arguments, 1),
          iterableB = _bContainer$arguments[0];

      if (t.isCallExpression(iterableB) && iterableB.callee.__inlineLoopsMacro && iterableB.callee === a.node) {
        return -1;
      }
    }

    var aStart = a.node.loc.start;
    var bStart = b.node.loc.start;

    if (bStart.line > aStart.line) {
      return -1;
    }

    if (aStart.line > bStart.line) {
      return 1;
    }

    if (bStart.column > aStart.column) {
      return -1;
    }

    return 1;
  });
  var handlers = {
    every: handleEvery,
    filter: handleFilter,
    find: handleFind,
    findIndex: handleFindKey,
    findKey: handleFindKey,
    forEach: handleForEach,
    map: handleMap,
    reduce: handleReduce,
    some: handleSome
  };

  function createTransformer(name, transform, isDecrementing, isObject) {
    return function _transform(path) {
      if (path.findParent(function (_path) {
        return _path.isConditionalExpression();
      })) {
        throw new MacroError("You cannot use ".concat(name, " in a conditional expression."));
      }

      var args = path.parent.arguments;

      if (args.some(function (arg) {
        return t.isSpreadElement(arg);
      })) {
        throw new MacroError('You cannot use spread arguments with the macro, please declare the arguments explicitly.');
      }

      var _args = _slicedToArray(args, 3),
          object = _args[0],
          handler = _args[1],
          initialValue = _args[2];

      var isHandlerMacro = allMethods.find(function (_ref5) {
        var methodPath = _ref5.path;
        return methodPath.node !== path.node && handler === methodPath.node;
      });

      if (isHandlerMacro) {
        throw new MacroError('You cannot use the macro directly as a handler, please wrap it in a function call.');
      }

      transform({
        t: t,
        path: path,
        object: object,
        handler: handler,
        initialValue: initialValue,
        isDecrementing: isDecrementing,
        isObject: isObject
      });
    };
  }

  allMethods.forEach(function (_ref6) {
    var method = _ref6.method,
        path = _ref6.path,
        sourceMethod = _ref6.sourceMethod,
        type = _ref6.type;
    var isDecrementing = type === 'decrementing';
    var isObject = type === 'object';
    var handler = createTransformer(method, handlers[sourceMethod], isDecrementing, isObject);
    handler(path);
  });
}

module.exports = createMacro(inlineLoops);