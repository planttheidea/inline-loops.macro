"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

function getInjectedValues(t, path, _ref) {
  var fn = _ref.fn,
      getResult = _ref.getResult,
      handler = _ref.handler,
      iterable = _ref.iterable,
      key = _ref.key,
      value = _ref.value;
  var valueAssignment = t.expressionStatement(t.assignmentExpression('=', value, t.memberExpression(iterable, key, true)));
  var resultApplication = getResultApplication(t, handler, fn, value, key, iterable, path);
  var resultStatement = resultApplication.pop();
  var result = getResult(resultStatement);
  var block = [valueAssignment];

  if (resultApplication.length) {
    block.push.apply(block, (0, _toConsumableArray2["default"])(resultApplication));
  }

  block.push(result);
  return {
    body: t.blockStatement(block),
    resultStatement: resultStatement
  };
}

function getLoop(_ref2) {
  var t = _ref2.t,
      body = _ref2.body,
      iterable = _ref2.iterable,
      key = _ref2.key,
      length = _ref2.length,
      value = _ref2.value,
      isDecrementing = _ref2.isDecrementing,
      isObject = _ref2.isObject;

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

function normalizeHandler(t, handler, path, _ref3) {
  var iterable = _ref3.iterable,
      key = _ref3.key,
      result = _ref3.result,
      value = _ref3.value;

  function createRename(_ref4) {
    var i = _ref4.i,
        k = _ref4.k,
        r = _ref4.r,
        v = _ref4.v;
    return function rename(_path) {
      if (r && result) {
        _path.scope.rename(r.name, result.name);
      }

      if (v && value) {
        _path.scope.rename(v.name, value.name);
      }

      if (k && key) {
        _path.scope.rename(k.name, key.name);
      }

      if (i && iterable) {
        _path.scope.rename(i.name, iterable.name);
      }
    };
  }

  var r;
  var v;
  var k;
  var i;

  if (result) {
    var _handler$params = (0, _slicedToArray2["default"])(handler.params, 4);

    r = _handler$params[0];
    v = _handler$params[1];
    k = _handler$params[2];
    i = _handler$params[3];
  } else {
    var _handler$params2 = (0, _slicedToArray2["default"])(handler.params, 3);

    v = _handler$params2[0];
    k = _handler$params2[1];
    i = _handler$params2[2];
  }

  if (t.isArrowFunctionExpression(handler)) {
    path.parentPath.traverse({
      ArrowFunctionExpression: createRename({
        r: r,
        v: v,
        k: k,
        i: i
      })
    });
  } else {
    path.parentPath.traverse({
      FunctionExpression: createRename({
        r: r,
        v: v,
        k: k,
        i: i
      })
    });
  }
}

function getResultApplication(t, handler, fn, value, key, iterable, path, result) {
  var callParams = result ? [result, value, key, iterable] : [value, key, iterable];

  if (t.isArrowFunctionExpression(handler) || t.isFunctionExpression(handler)) {
    var body = handler.body;

    if (t.isBlockStatement(body)) {
      // eslint-disable-next-line prefer-destructuring
      body = body.body;
      var parentPath = path.parentPath;
      var returnCount = 0;
      var hasConditionalReturn = false;
      parentPath.traverse({
        ReturnStatement: function ReturnStatement(_path) {
          returnCount++;

          if (_path.parentPath.node !== handler.body) {
            hasConditionalReturn = true;
          }
        }
      });
      /* eslint-disable no-console */

      if (returnCount >= 2) {
        console.warn('You are using multiple `return` statements in your callback, which is a deopt because the callback operation cannot be inlined. ' + 'You should consider refactoring your code to provide only one `return` statement.');
      } else if (hasConditionalReturn) {
        console.warn('You are using a `return` statement in a conditional block, which is a deopt because the callback operation cannot be inlined. ' + 'You should consider refactoring your code to have a consistent `return` statement.');
      }
      /* eslint-enable */


      var canBeInlined = !hasConditionalReturn && returnCount < 2;

      if (canBeInlined) {
        renameLocalVariables(t, path);

        if (!handler.params.every(function (param) {
          return t.isIdentifier(param);
        })) {
          var _body;

          var injectedParamAssigns = handler.params.reduce(function (injected, param, index) {
            if (t.isIdentifier(param)) {
              return injected;
            }

            injected.push(t.variableDeclaration('const', [t.variableDeclarator(param, callParams[index])]));
            handler.params[index] = callParams[index];
            return injected;
          }, []);

          (_body = body).unshift.apply(_body, (0, _toConsumableArray2["default"])(injectedParamAssigns));
        }

        normalizeHandler(t, handler, path, {
          result: result,
          iterable: iterable,
          key: key,
          value: value
        });

        if (body.length === 1) {
          var node = body[0];

          if (t.isExpression(node)) {
            return [node];
          }

          if (t.isExpressionStatement(node)) {
            return [node.expression];
          }

          if (t.isReturnStatement(node)) {
            return [node.argument];
          }
        } else {
          var ret = body[body.length - 1];

          if (t.isReturnStatement(ret)) {
            body[body.length - 1] = ret.argument;
          }

          return body;
        }
      }
    } else if (t.isExpression(body)) {
      normalizeHandler(t, handler, path, {
        result: result,
        iterable: iterable,
        key: key,
        value: value
      });
      return [body];
    }
  }

  var callExpression = t.callExpression(fn, callParams);
  callExpression.__inlineLoopsMacroFallback = true;
  return [callExpression];
}

function getUid(scope, name) {
  return scope.generateUidIdentifier(name);
}

function insertBeforeParent(_ref5) {
  var fn = _ref5.fn,
      handler = _ref5.handler,
      isObject = _ref5.isObject,
      iterable = _ref5.iterable,
      loop = _ref5.loop,
      object = _ref5.object,
      path = _ref5.path,
      result = _ref5.result,
      resultStatement = _ref5.resultStatement,
      resultValue = _ref5.resultValue,
      t = _ref5.t,
      value = _ref5.value;
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

function renameLocalVariables(t, path) {
  var containerPath = path.getStatementParent().parentPath;

  function renameLocalVariable(node, functionPath) {
    var name = node.name;
    var newId = containerPath.scope.generateUidIdentifier(name);
    functionPath.scope.rename(name, newId.name);
  }

  path.parentPath.traverse({
    ArrayPattern: function ArrayPattern(_path) {
      var elements = _path.node.elements;
      elements.forEach(function (element) {
        if (t.isIdentifier(element)) {
          renameLocalVariable(element, _path.getFunctionParent());
        }
      });
    },
    ObjectPattern: function ObjectPattern(_path) {
      var properties = _path.node.properties;
      properties.forEach(function (property) {
        if (t.isIdentifier(property.value)) {
          renameLocalVariable(property.value, _path.getFunctionParent());
        }
      });
    },
    VariableDeclarator: function VariableDeclarator(_path) {
      var node = _path.node;

      if (t.isIdentifier(node.id)) {
        renameLocalVariable(node.id, _path.getFunctionParent());
      }
    }
  });
}

module.exports = {
  getDefaultResult: getDefaultResult,
  getIds: getIds,
  getInjectedValues: getInjectedValues,
  getLoop: getLoop,
  getUid: getUid,
  getResultApplication: getResultApplication,
  insertBeforeParent: insertBeforeParent,
  isCachedReference: isCachedReference,
  renameLocalVariables: renameLocalVariables
};