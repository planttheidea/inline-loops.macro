"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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
      return allMethods.push.apply(allMethods, (0, _toConsumableArray2["default"])(incrementingCalls).concat((0, _toConsumableArray2["default"])(decrementingCalls)));
    }

    if (isObjectOnly) {
      return allMethods.push.apply(allMethods, (0, _toConsumableArray2["default"])(objectCalls));
    }

    return allMethods.push.apply(allMethods, (0, _toConsumableArray2["default"])(incrementingCalls).concat((0, _toConsumableArray2["default"])(decrementingCalls), (0, _toConsumableArray2["default"])(objectCalls)));
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
      var _aContainer$arguments = (0, _slicedToArray2["default"])(aContainer.arguments, 1),
          iterableA = _aContainer$arguments[0];

      if (t.isCallExpression(iterableA) && iterableA.callee.__inlineLoopsMacro && iterableA.callee === b.node) {
        return 1;
      }
    }

    if (bContainer.arguments) {
      var _bContainer$arguments = (0, _slicedToArray2["default"])(bContainer.arguments, 1),
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

      var _args = (0, _slicedToArray2["default"])(args, 3),
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