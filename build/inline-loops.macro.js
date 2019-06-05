"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require("babel-plugin-macros"),
    createMacro = _require.createMacro,
    MacroError = _require.MacroError;

function getDefaultResult(t, isObject) {
  return isObject ? t.objectExpression([]) : t.arrayExpression();
}

function getIds(scope) {
  var iterable = getUid(scope, "iterable");
  var fn = getUid(scope, "fn");
  var result = getUid(scope, "result");
  var key = getUid(scope, "key");
  var length = getUid(scope, "length");
  var value = getUid(scope, "value");
  return {
    fn: fn,
    iterable: iterable,
    key: key,
    length: length,
    result: result,
    value: value
  };
}

function getLoop(_ref) {
  var t = _ref.t,
      body = _ref.body,
      iterable = _ref.iterable,
      key = _ref.key,
      length = _ref.length,
      value = _ref.value,
      isDecrementing = _ref.isDecrementing,
      isObject = _ref.isObject;

  if (isObject) {
    var left = t.variableDeclaration("let", [t.variableDeclarator(key)]);
    var right = iterable;
    return t.forInStatement(left, right, body);
  }

  var assignments;
  var test;
  var update;

  if (isDecrementing) {
    assignments = [t.variableDeclarator(key, t.binaryExpression("-", t.memberExpression(iterable, t.identifier("length")), t.numericLiteral(1)))];
    test = t.binaryExpression(">=", key, t.numericLiteral(0));
    update = t.updateExpression("--", key, true);
  } else {
    assignments = [t.variableDeclarator(key, t.numericLiteral(0)), t.variableDeclarator(length, t.memberExpression(iterable, t.identifier("length")))];
    test = t.binaryExpression("<", key, length);
    update = t.updateExpression("++", key, true);
  }

  if (value) {
    assignments.push(t.variableDeclarator(value));
  }

  return t.forStatement(t.variableDeclaration("let", assignments), test, update, body);
}

function getResultStatement(t, handler, fn, value, key, iterable, path) {
  if (t.isArrowFunctionExpression(handler)) {
    var body = handler.body;

    if (t.isBlockStatement(body)) {
      body = body.body;

      if (body.length === 1) {
        var _handler$params = _slicedToArray(handler.params, 3),
            v = _handler$params[0],
            k = _handler$params[1],
            i = _handler$params[2];

        var parentPath = path.parentPath;
        var node = body[0];
        parentPath.traverse({
          ArrowFunctionExpression: function ArrowFunctionExpression(_path) {
            if (v) {
              _path.scope.rename(v.name, value.name);
            }

            if (k) {
              _path.scope.rename(k.name, key.name);
            }

            if (i) {
              _path.scope.rename(i.name, iterable.name);
            }
          }
        });

        if (t.isExpression(node)) {
          return node;
        }

        if (t.isExpressionStatement(node)) {
          return node.expression;
        }

        if (t.isReturnStatement(node)) {
          return node.argument;
        }
      }
    } else {
      var _handler$params2 = _slicedToArray(handler.params, 3),
          _v = _handler$params2[0],
          _k = _handler$params2[1],
          _i2 = _handler$params2[2];

      var _parentPath = path.parentPath;

      _parentPath.traverse({
        ArrowFunctionExpression: function ArrowFunctionExpression(_path) {
          if (_v) {
            _path.scope.rename(_v.name, value.name);
          }

          if (_k) {
            _path.scope.rename(_k.name, key.name);
          }

          if (_i2) {
            _path.scope.rename(_i2.name, iterable.name);
          }
        }
      });

      if (t.isExpression(body)) {
        return body;
      }
    }
  }

  if (t.isFunctionExpression(handler)) {
    var _body = handler.body.body;

    if (_body.length === 1) {
      var _handler$params3 = _slicedToArray(handler.params, 3),
          _v2 = _handler$params3[0],
          _k2 = _handler$params3[1],
          _i3 = _handler$params3[2];

      var _parentPath2 = path.parentPath;
      var _node = _body[0];

      _parentPath2.traverse({
        FunctionExpression: function FunctionExpression(_path) {
          if (_v2) {
            _path.scope.rename(_v2.name, value.name);
          }

          if (_k2) {
            _path.scope.rename(_k2.name, key.name);
          }

          if (_i3) {
            _path.scope.rename(_i3.name, iterable.name);
          }
        }
      });

      if (t.isExpression(_node)) {
        return _node;
      }

      if (t.isExpressionStatement(_node)) {
        return _node.expression;
      }

      if (t.isReturnStatement(_node)) {
        return _node.argument;
      }
    }
  }

  var callExpression = t.callExpression(fn, [value, key, iterable]);
  callExpression.isFallback = true;
  return callExpression;
}

function getUid(scope, name) {
  return scope.generateUidIdentifier(name);
}

function insertBeforeParent(_ref2) {
  var fn = _ref2.fn,
      handler = _ref2.handler,
      isObject = _ref2.isObject,
      iterable = _ref2.iterable,
      loop = _ref2.loop,
      object = _ref2.object,
      path = _ref2.path,
      result = _ref2.result,
      resultStatement = _ref2.resultStatement,
      resultValue = _ref2.resultValue,
      t = _ref2.t,
      value = _ref2.value;
  var insertBefore = [];

  if (!isCachedReference(t, object)) {
    var iterableVar = t.variableDeclaration("const", [t.variableDeclarator(iterable, object)]);
    insertBefore.push(iterableVar);
  }

  if (!isCachedReference(t, handler) && t.isCallExpression(resultStatement) && resultStatement.isFallback) {
    var handlerVar = t.variableDeclaration("const", [t.variableDeclarator(fn, handler)]);
    insertBefore.push(handlerVar);
  }

  if (result) {
    var resultVar = t.variableDeclaration("let", [t.variableDeclarator(result, resultValue)]);
    insertBefore.push(resultVar);
  }

  if (isObject) {
    var valueVar = t.variableDeclaration("let", [t.variableDeclarator(value)]);
    insertBefore.push(valueVar);
  }

  insertBefore.push(loop);
  path.getStatementParent().insertBefore(insertBefore);
}

function isCachedReference(t, node) {
  return t.isIdentifier(node);
}

function handleEvery(_ref3) {
  var t = _ref3.t,
      path = _ref3.path,
      object = _ref3.object,
      handler = _ref3.handler,
      isDecrementing = _ref3.isDecrementing,
      isObject = _ref3.isObject;

  var _getIds = getIds(path.scope),
      fn = _getIds.fn,
      iterable = _getIds.iterable,
      key = _getIds.key,
      length = _getIds.length,
      result = _getIds.result,
      value = _getIds.value;

  var isHandlerCached = isCachedReference(t, handler);
  var isIterableCached = isCachedReference(t, object);
  var fnUsed = isHandlerCached ? handler : fn;
  var iterableUsed = isIterableCached ? object : iterable;
  var valueAssignment = t.expressionStatement(t.assignmentExpression("=", value, t.memberExpression(iterableUsed, key, true)));
  var resultStatement = getResultStatement(t, handler, fnUsed, value, key, iterableUsed, path);
  var expr = t.ifStatement(t.unaryExpression("!", resultStatement), t.blockStatement([t.expressionStatement(t.assignmentExpression("=", result, t.booleanLiteral(false))), t.breakStatement()]));
  var loop = getLoop({
    t: t,
    body: t.blockStatement([valueAssignment, expr]),
    iterable: iterableUsed,
    key: key,
    length: length,
    isDecrementing: isDecrementing,
    isObject: isObject,
    scope: path.scope,
    value: value
  });
  insertBeforeParent({
    fn: fn,
    handler: handler,
    isObject: isObject,
    iterable: iterable,
    loop: loop,
    object: object,
    path: path,
    result: result,
    resultStatement: resultStatement,
    resultValue: t.booleanLiteral(true),
    t: t,
    value: value
  });
  path.parentPath.replaceWith(result);
}

function handleFilter(_ref4) {
  var t = _ref4.t,
      path = _ref4.path,
      object = _ref4.object,
      handler = _ref4.handler,
      isDecrementing = _ref4.isDecrementing,
      isObject = _ref4.isObject;

  var _getIds2 = getIds(path.scope),
      fn = _getIds2.fn,
      iterable = _getIds2.iterable,
      key = _getIds2.key,
      length = _getIds2.length,
      result = _getIds2.result,
      value = _getIds2.value;

  var isHandlerCached = isCachedReference(t, handler);
  var isIterableCached = isCachedReference(t, object);
  var fnUsed = isHandlerCached ? handler : fn;
  var iterableUsed = isIterableCached ? object : iterable;
  var valueAssignment = t.expressionStatement(t.assignmentExpression("=", value, t.memberExpression(iterableUsed, key, true)));
  var resultAssignment = isObject ? t.assignmentExpression("=", t.memberExpression(result, key, true), value) : t.callExpression(t.memberExpression(result, t.identifier("push")), [value]);
  var resultStatement = getResultStatement(t, handler, fnUsed, value, key, iterableUsed, path);
  var expr = t.ifStatement(resultStatement, t.expressionStatement(resultAssignment));
  var loop = getLoop({
    t: t,
    body: t.blockStatement([valueAssignment, expr]),
    iterable: iterableUsed,
    key: key,
    length: length,
    value: value,
    isDecrementing: isDecrementing,
    isObject: isObject,
    scope: path.scope
  });
  insertBeforeParent({
    fn: fn,
    handler: handler,
    isObject: isObject,
    iterable: iterable,
    loop: loop,
    object: object,
    path: path,
    result: result,
    resultStatement: resultStatement,
    resultValue: getDefaultResult(t, isObject),
    t: t,
    value: value
  });
  path.parentPath.replaceWith(result);
}

function handleFind(_ref5) {
  var t = _ref5.t,
      path = _ref5.path,
      object = _ref5.object,
      handler = _ref5.handler,
      isDecrementing = _ref5.isDecrementing,
      isObject = _ref5.isObject;

  var _getIds3 = getIds(path.scope),
      fn = _getIds3.fn,
      iterable = _getIds3.iterable,
      key = _getIds3.key,
      length = _getIds3.length,
      result = _getIds3.result,
      value = _getIds3.value;

  var isHandlerCached = isCachedReference(t, handler);
  var isIterableCached = isCachedReference(t, object);
  var fnUsed = isHandlerCached ? handler : fn;
  var iterableUsed = isIterableCached ? object : iterable;
  var valueAssignment = t.expressionStatement(t.assignmentExpression("=", value, t.memberExpression(iterableUsed, key, true)));
  var resultStatement = getResultStatement(t, handler, fnUsed, value, key, iterableUsed, path);
  var expr = t.ifStatement(resultStatement, t.blockStatement([t.expressionStatement(t.assignmentExpression("=", result, value)), t.breakStatement()]));
  var loop = getLoop({
    t: t,
    body: t.blockStatement([valueAssignment, expr]),
    iterable: iterableUsed,
    key: key,
    length: length,
    isDecrementing: isDecrementing,
    isObject: isObject,
    scope: path.scope,
    value: value
  });
  insertBeforeParent({
    fn: fn,
    handler: handler,
    isObject: isObject,
    iterable: iterable,
    loop: loop,
    object: object,
    path: path,
    result: result,
    resultStatement: resultStatement,
    t: t,
    value: value
  });
  path.parentPath.replaceWith(result);
}

function handleFindKey(_ref6) {
  var t = _ref6.t,
      path = _ref6.path,
      object = _ref6.object,
      handler = _ref6.handler,
      isDecrementing = _ref6.isDecrementing,
      isObject = _ref6.isObject;

  var _getIds4 = getIds(path.scope),
      fn = _getIds4.fn,
      iterable = _getIds4.iterable,
      key = _getIds4.key,
      length = _getIds4.length,
      result = _getIds4.result,
      value = _getIds4.value;

  var isHandlerCached = isCachedReference(t, handler);
  var isIterableCached = isCachedReference(t, object);
  var fnUsed = isHandlerCached ? handler : fn;
  var iterableUsed = isIterableCached ? object : iterable;
  var valueAssignment = t.expressionStatement(t.assignmentExpression("=", value, t.memberExpression(iterableUsed, key, true)));
  var resultStatement = getResultStatement(t, handler, fnUsed, value, key, iterableUsed, path);
  var expr = t.ifStatement(resultStatement, t.blockStatement([t.expressionStatement(t.assignmentExpression("=", result, key)), t.breakStatement()]));
  var loop = getLoop({
    t: t,
    body: t.blockStatement([valueAssignment, expr]),
    iterable: iterableUsed,
    key: key,
    length: length,
    isDecrementing: isDecrementing,
    isObject: isObject,
    scope: path.scope,
    value: value
  });
  insertBeforeParent({
    fn: fn,
    handler: handler,
    isObject: isObject,
    iterable: iterable,
    loop: loop,
    object: object,
    path: path,
    result: result,
    resultStatement: resultStatement,
    resultValue: isObject ? undefined : t.numericLiteral(-1),
    t: t,
    value: value
  });
  path.parentPath.replaceWith(result);
}

function handleForEach(_ref7) {
  var t = _ref7.t,
      path = _ref7.path,
      object = _ref7.object,
      handler = _ref7.handler,
      isDecrementing = _ref7.isDecrementing,
      isObject = _ref7.isObject;

  var _getIds5 = getIds(path.scope),
      fn = _getIds5.fn,
      iterable = _getIds5.iterable,
      key = _getIds5.key,
      length = _getIds5.length,
      value = _getIds5.value;

  var isHandlerCached = isCachedReference(t, handler);
  var isIterableCached = isCachedReference(t, object);
  var fnUsed = isHandlerCached ? handler : fn;
  var iterableUsed = isIterableCached ? object : iterable;
  var valueAssignment = t.expressionStatement(t.assignmentExpression("=", value, t.memberExpression(iterableUsed, key, true)));
  var resultStatement = getResultStatement(t, handler, fnUsed, value, key, iterableUsed, path);
  var call = t.expressionStatement(resultStatement);
  var loop = getLoop({
    t: t,
    body: t.blockStatement([valueAssignment, call]),
    iterable: iterableUsed,
    key: key,
    length: length,
    isDecrementing: isDecrementing,
    isObject: isObject,
    scope: path.scope,
    value: value
  });
  insertBeforeParent({
    fn: fn,
    handler: handler,
    isObject: isObject,
    iterable: iterable,
    loop: loop,
    object: object,
    path: path,
    resultStatement: resultStatement,
    t: t,
    value: value
  });
  path.parentPath.remove();
}

function handleMap(_ref8) {
  var t = _ref8.t,
      path = _ref8.path,
      object = _ref8.object,
      handler = _ref8.handler,
      isDecrementing = _ref8.isDecrementing,
      isObject = _ref8.isObject;

  var _getIds6 = getIds(path.scope),
      fn = _getIds6.fn,
      iterable = _getIds6.iterable,
      key = _getIds6.key,
      length = _getIds6.length,
      result = _getIds6.result,
      value = _getIds6.value;

  var isHandlerCached = isCachedReference(t, handler);
  var isIterableCached = isCachedReference(t, object);
  var fnUsed = isHandlerCached ? handler : fn;
  var iterableUsed = isIterableCached ? object : iterable;
  var valueAssignment = t.expressionStatement(t.assignmentExpression("=", value, t.memberExpression(iterableUsed, key, true)));
  var resultStatement = getResultStatement(t, handler, fnUsed, value, key, iterableUsed, path);
  var expr = t.expressionStatement(isObject ? t.assignmentExpression("=", t.memberExpression(result, key, true), resultStatement) : t.callExpression(t.memberExpression(result, t.identifier("push")), [resultStatement]));
  var loop = getLoop({
    t: t,
    body: t.blockStatement([valueAssignment, expr]),
    iterable: iterableUsed,
    key: key,
    length: length,
    isDecrementing: isDecrementing,
    isObject: isObject,
    scope: path.scope,
    value: value
  });
  insertBeforeParent({
    fn: fn,
    handler: handler,
    isObject: isObject,
    iterable: iterable,
    loop: loop,
    object: object,
    path: path,
    result: result,
    resultStatement: resultStatement,
    resultValue: getDefaultResult(t, isObject),
    t: t,
    value: value
  });
  path.parentPath.replaceWith(result);
}

function handleReduce(_ref9) {
  var t = _ref9.t,
      path = _ref9.path,
      object = _ref9.object,
      handler = _ref9.handler,
      initialValue = _ref9.initialValue,
      isDecrementing = _ref9.isDecrementing,
      isObject = _ref9.isObject;

  var _getIds7 = getIds(path.scope),
      fn = _getIds7.fn,
      iterable = _getIds7.iterable,
      key = _getIds7.key,
      length = _getIds7.length,
      result = _getIds7.result,
      value = _getIds7.value;

  var hasInitialValue = !!initialValue;
  var isHandlerCached = isCachedReference(t, handler);
  var isIterableCached = isCachedReference(t, object);
  var fnUsed = isHandlerCached ? handler : fn;
  var iterableUsed = isIterableCached ? object : iterable;
  var injected = [];
  var hasInitialValueId;

  if (!hasInitialValue) {
    if (isObject) {
      hasInitialValueId = getUid(path.scope, "hasInitialValue");
      injected.push(t.variableDeclaration("let", [t.variableDeclarator(hasInitialValueId, t.booleanLiteral(false))]));
    } else if (isDecrementing) {
      injected.push(t.variableDeclaration("const", [t.variableDeclarator(length, t.memberExpression(iterableUsed, t.identifier("length")))]));
      initialValue = t.memberExpression(iterableUsed, t.binaryExpression("-", length, t.numericLiteral(1)), true);
    } else {
      initialValue = t.memberExpression(iterableUsed, t.numericLiteral(0), true);
    }
  }

  if (isObject) {
    injected.push(t.variableDeclaration("let", [t.variableDeclarator(value)]));
  }

  var valueAssignment = t.expressionStatement(t.assignmentExpression("=", value, t.memberExpression(iterableUsed, key, true)));
  var call = t.callExpression(fnUsed, [result, value, key, iterableUsed]);
  var resultAssignment = t.assignmentExpression("=", result, call);
  var block;

  if (!hasInitialValue && isObject) {
    var ifHasInitialValue = t.ifStatement(hasInitialValueId, t.blockStatement([valueAssignment, t.expressionStatement(resultAssignment)]), t.blockStatement([t.expressionStatement(t.assignmentExpression("=", hasInitialValueId, t.booleanLiteral(true))), t.expressionStatement(t.assignmentExpression("=", result, t.memberExpression(iterableUsed, key, true)))]));
    block = [ifHasInitialValue];
  } else {
    block = [valueAssignment, t.expressionStatement(resultAssignment)];
  }

  var loop = getLoop({
    t: t,
    body: t.blockStatement(block),
    iterable: iterableUsed,
    key: key,
    length: length,
    isDecrementing: isDecrementing,
    isObject: isObject,
    scope: path.scope,
    value: value
  });

  if (!hasInitialValue && !isObject) {
    var keyValue = loop.init.declarations.find(function (_ref10) {
      var id = _ref10.id;
      return id.name === key.name;
    });

    if (isDecrementing) {
      keyValue.init.left = length;
      keyValue.init.right = t.numericLiteral(2);
    } else {
      keyValue.init = t.numericLiteral(1);
    }
  }

  var insertBefore = [];

  if (iterableUsed === iterable) {
    var iterableVar = t.variableDeclaration("const", [t.variableDeclarator(iterable, object)]);
    insertBefore.push(iterableVar);
  }

  insertBefore.push.apply(insertBefore, injected);

  if (fnUsed === fn) {
    var handlerVar = t.variableDeclaration("const", [t.variableDeclarator(fn, handler)]);
    insertBefore.push(handlerVar);
  }

  var resultVar = t.variableDeclaration("let", [t.variableDeclarator(result, initialValue)]);
  insertBefore.push(resultVar);
  insertBefore.push(loop);
  path.getStatementParent().insertBefore(insertBefore);
  path.parentPath.replaceWith(result);
}

function handleSome(_ref11) {
  var t = _ref11.t,
      path = _ref11.path,
      object = _ref11.object,
      handler = _ref11.handler,
      isDecrementing = _ref11.isDecrementing,
      isObject = _ref11.isObject;

  var _getIds8 = getIds(path.scope),
      fn = _getIds8.fn,
      iterable = _getIds8.iterable,
      key = _getIds8.key,
      length = _getIds8.length,
      result = _getIds8.result,
      value = _getIds8.value;

  var isHandlerCached = isCachedReference(t, handler);
  var isIterableCached = isCachedReference(t, object);
  var fnUsed = isHandlerCached ? handler : fn;
  var iterableUsed = isIterableCached ? object : iterable;
  var valueAssignment = t.expressionStatement(t.assignmentExpression("=", value, t.memberExpression(iterableUsed, key, true)));
  var resultStatement = getResultStatement(t, handler, fnUsed, value, key, iterableUsed, path);
  var expr = t.ifStatement(resultStatement, t.blockStatement([t.expressionStatement(t.assignmentExpression("=", result, t.booleanLiteral(true))), t.breakStatement()]));
  var loop = getLoop({
    t: t,
    body: t.blockStatement([valueAssignment, expr]),
    iterable: iterableUsed,
    key: key,
    length: length,
    isDecrementing: isDecrementing,
    isObject: isObject,
    scope: path.scope,
    value: value
  });
  insertBeforeParent({
    fn: fn,
    handler: handler,
    isObject: isObject,
    iterable: iterable,
    loop: loop,
    object: object,
    path: path,
    result: result,
    resultStatement: resultStatement,
    resultValue: t.booleanLiteral(false),
    t: t,
    value: value
  });
  path.parentPath.replaceWith(result);
}

var METHODS = ["every", "filter", "find", "findIndex", "findKey", "forEach", "map", "reduce", "some"];
var ARRAY_ONLY_METHODS = ["findIndex"];
var OBJECT_ONLY_METHODS = ["findKey"];

function getCallTypes(references, method) {
  var isArrayOnly = ARRAY_ONLY_METHODS.includes(method);
  var isObjectOnly = OBJECT_ONLY_METHODS.includes(method);
  var decrementingMethod = "".concat(method, "Right");
  var objectMethod = isObjectOnly ? method : "".concat(method, "Object");
  var incrementingCalls = references[method] || [];
  var decrementingCalls = references[decrementingMethod] || [];
  var objectCalls = references[objectMethod] || [];
  return {
    decrementingCalls: decrementingCalls,
    decrementingMethod: decrementingMethod,
    incrementingCalls: incrementingCalls,
    isArrayOnly: isArrayOnly,
    isObjectOnly: isObjectOnly,
    objectCalls: objectCalls,
    objectMethod: objectMethod
  };
}

function inlineLoops(_ref12) {
  var references = _ref12.references,
      state = _ref12.state,
      babel = _ref12.babel;
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

    allMethods.push.apply(allMethods, _toConsumableArray(incrementingCalls).concat(_toConsumableArray(decrementingCalls), _toConsumableArray(objectCalls)));
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

  function createHandler(name, transform, isDecrementing, isObject) {
    return function (path) {
      if (path.findParent(function (path) {
        return path.isConditionalExpression();
      })) {
        throw new MacroError("You cannot use ".concat(name, " in a conditional expression."));
      }

      var callee = path.parentPath.parent.callee;

      if (callee) {
        var ancestorPath = path.parentPath;

        while (ancestorPath) {
          if (ancestorPath.node && ancestorPath.node.body) {
            break;
          }

          if (t.isCallExpression(ancestorPath)) {
            (function () {
              var expression = ancestorPath.parent.expression;
              var callee = expression ? expression.callee : ancestorPath.parent.callee;

              if (allMethods.find(function (_ref13) {
                var node = _ref13.node;
                return node === callee && node !== path.node;
              })) {
                throw new MacroError("You cannot nest looper methods. You should store the results of ".concat(name, " to a variable, and then call ").concat(path.parentPath.parent.callee.name, " with it."));
              }
            })();
          }

          ancestorPath = ancestorPath.parentPath;
        }
      }

      var _path$parent$argument = _slicedToArray(path.parent.arguments, 3),
          object = _path$parent$argument[0],
          handler = _path$parent$argument[1],
          initialValue = _path$parent$argument[2];

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

  METHODS.forEach(function (method) {
    var _getCallTypes2 = getCallTypes(references, method),
        decrementingCalls = _getCallTypes2.decrementingCalls,
        decrementingMethod = _getCallTypes2.decrementingMethod,
        incrementingCalls = _getCallTypes2.incrementingCalls,
        isArrayOnly = _getCallTypes2.isArrayOnly,
        isObjectOnly = _getCallTypes2.isObjectOnly,
        objectCalls = _getCallTypes2.objectCalls,
        objectMethod = _getCallTypes2.objectMethod;

    if (!isObjectOnly) {
      incrementingCalls.forEach(createHandler(method, handlers[method]));
      decrementingCalls.forEach(createHandler(decrementingMethod, handlers[method], true));
    }

    if (!isArrayOnly) {
      objectCalls.forEach(createHandler(objectMethod, handlers[method], false, true));
    }
  });
}

module.exports = createMacro(inlineLoops);