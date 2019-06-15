"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function getDefaultResult(t, isObject) {
  return isObject ? t.objectExpression([]) : t.arrayExpression();
}

var ID_TYPES = ['fn', 'iterable', 'key', 'length', 'result', 'value'];

function getIds(scope) {
  return ID_TYPES.reduce(function (ids, type) {
    ids[type] = getUid(scope, type);
    return ids;
  }, {});
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
    var left = t.variableDeclaration('let', [t.variableDeclarator(key)]);
    var right = iterable;
    return t.forInStatement(left, right, body);
  }

  var assignments;
  var test;
  var update;

  if (isDecrementing) {
    assignments = [t.variableDeclarator(key, t.binaryExpression('-', t.memberExpression(iterable, t.identifier('length')), t.numericLiteral(1)))];
    test = t.binaryExpression('>=', key, t.numericLiteral(0));
    update = t.updateExpression('--', key, true);
  } else {
    assignments = [t.variableDeclarator(key, t.numericLiteral(0)), t.variableDeclarator(length, t.memberExpression(iterable, t.identifier('length')))];
    test = t.binaryExpression('<', key, length);
    update = t.updateExpression('++', key, true);
  }

  if (value) {
    assignments.push(t.variableDeclarator(value));
  }

  return t.forStatement(t.variableDeclaration('let', assignments), test, update, body);
}

function getReduceResultStatement(t, handler, fn, result, value, key, iterable, path) {
  function createRename(r, v, k, i) {
    return function rename(_path) {
      if (r) {
        _path.scope.rename(r.name, result.name);
      }

      if (v) {
        _path.scope.rename(v.name, value.name);
      }

      if (k) {
        _path.scope.rename(k.name, key.name);
      }

      if (i) {
        _path.scope.rename(i.name, iterable.name);
      }
    };
  }

  if (t.isArrowFunctionExpression(handler) || t.isFunctionExpression(handler)) {
    var body = handler.body;

    if (t.isBlockStatement(body)) {
      // eslint-disable-next-line prefer-destructuring
      body = body.body;

      if (body.length === 1) {
        var _handler$params = (0, _slicedToArray2["default"])(handler.params, 4),
            r = _handler$params[0],
            v = _handler$params[1],
            k = _handler$params[2],
            i = _handler$params[3];

        var node = body[0];

        if (t.isArrowFunctionExpression(handler)) {
          path.parentPath.traverse({
            ArrowFunctionExpression: createRename(r, v, k, i)
          });
        } else {
          path.parentPath.traverse({
            FunctionExpression: createRename(r, v, k, i)
          });
        }

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
    } else if (t.isExpression(body)) {
      var _handler$params2 = (0, _slicedToArray2["default"])(handler.params, 4),
          _r = _handler$params2[0],
          _v = _handler$params2[1],
          _k = _handler$params2[2],
          _i = _handler$params2[3];

      path.parentPath.traverse({
        ArrowFunctionExpression: createRename(_r, _v, _k, _i)
      });
      return body;
    }
  }

  var callExpression = t.callExpression(fn, [result, value, key, iterable]);
  callExpression.__inlineLoopsMacroFallback = true;
  return callExpression;
}

function getResultStatement(t, handler, fn, value, key, iterable, path) {
  function createRename(v, k, i) {
    return function rename(_path) {
      if (v) {
        _path.scope.rename(v.name, value.name);
      }

      if (k) {
        _path.scope.rename(k.name, key.name);
      }

      if (i) {
        _path.scope.rename(i.name, iterable.name);
      }
    };
  }

  if (t.isArrowFunctionExpression(handler) || t.isFunctionExpression(handler)) {
    var body = handler.body;

    if (t.isBlockStatement(body)) {
      // eslint-disable-next-line prefer-destructuring
      body = body.body;

      if (body.length === 1) {
        var _handler$params3 = (0, _slicedToArray2["default"])(handler.params, 3),
            v = _handler$params3[0],
            k = _handler$params3[1],
            i = _handler$params3[2];

        var node = body[0];

        if (t.isArrowFunctionExpression(handler)) {
          path.parentPath.traverse({
            ArrowFunctionExpression: createRename(v, k, i)
          });
        } else {
          path.parentPath.traverse({
            FunctionExpression: createRename(v, k, i)
          });
        }

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
    } else if (t.isExpression(body)) {
      var _handler$params4 = (0, _slicedToArray2["default"])(handler.params, 3),
          _v2 = _handler$params4[0],
          _k2 = _handler$params4[1],
          _i2 = _handler$params4[2];

      path.parentPath.traverse({
        ArrowFunctionExpression: createRename(_v2, _k2, _i2)
      });
      return body;
    }
  }

  var callExpression = t.callExpression(fn, [value, key, iterable]);
  callExpression.__inlineLoopsMacroFallback = true;
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
    var iterableVar = t.variableDeclaration('const', [t.variableDeclarator(iterable, object)]);
    insertBefore.push(iterableVar);
  }

  if (!isCachedReference(t, handler) && t.isCallExpression(resultStatement) && resultStatement.__inlineLoopsMacroFallback) {
    var handlerVar = t.variableDeclaration('const', [t.variableDeclarator(fn, handler)]);
    insertBefore.push(handlerVar);
  }

  if (result) {
    var resultVar = t.variableDeclaration('let', [t.variableDeclarator(result, resultValue)]);
    insertBefore.push(resultVar);
  }

  if (isObject) {
    var valueVar = t.variableDeclaration('let', [t.variableDeclarator(value)]);
    insertBefore.push(valueVar);
  }

  insertBefore.push(loop);
  path.getStatementParent().insertBefore(insertBefore);
}

function isCachedReference(t, node) {
  return t.isIdentifier(node);
}

module.exports = {
  getDefaultResult: getDefaultResult,
  getIds: getIds,
  getLoop: getLoop,
  getUid: getUid,
  getReduceResultStatement: getReduceResultStatement,
  getResultStatement: getResultStatement,
  insertBeforeParent: insertBeforeParent,
  isCachedReference: isCachedReference
};