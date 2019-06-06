"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  if (t.isArrowFunctionExpression(handler)) {
    var body = handler.body;

    if (t.isBlockStatement(body)) {
      // eslint-disable-next-line prefer-destructuring
      body = body.body;

      if (body.length === 1) {
        var _handler$params = _slicedToArray(handler.params, 4),
            r = _handler$params[0],
            v = _handler$params[1],
            k = _handler$params[2],
            i = _handler$params[3];

        var parentPath = path.parentPath;
        var node = body[0];
        parentPath.traverse({
          ArrowFunctionExpression: function ArrowFunctionExpression(_path) {
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
      var _handler$params2 = _slicedToArray(handler.params, 4),
          _r = _handler$params2[0],
          _v = _handler$params2[1],
          _k = _handler$params2[2],
          _i2 = _handler$params2[3];

      var _parentPath = path.parentPath;

      _parentPath.traverse({
        ArrowFunctionExpression: function ArrowFunctionExpression(_path) {
          if (_r) {
            _path.scope.rename(_r.name, result.name);
          }

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
      var _handler$params3 = _slicedToArray(handler.params, 4),
          _r2 = _handler$params3[0],
          _v2 = _handler$params3[1],
          _k2 = _handler$params3[2],
          _i3 = _handler$params3[3];

      var _parentPath2 = path.parentPath;
      var _node = _body[0];

      _parentPath2.traverse({
        FunctionExpression: function FunctionExpression(_path) {
          if (_r2) {
            _path.scope.rename(_r2.name, result.name);
          }

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

  var callExpression = t.callExpression(fn, [result, value, key, iterable]);
  callExpression.__inlineLoopsMacroFallback = true;
  return callExpression;
}

function getResultStatement(t, handler, fn, value, key, iterable, path) {
  if (t.isArrowFunctionExpression(handler)) {
    var body = handler.body;

    if (t.isBlockStatement(body)) {
      // eslint-disable-next-line prefer-destructuring
      body = body.body;

      if (body.length === 1) {
        var _handler$params4 = _slicedToArray(handler.params, 3),
            v = _handler$params4[0],
            k = _handler$params4[1],
            i = _handler$params4[2];

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
      var _handler$params5 = _slicedToArray(handler.params, 3),
          _v3 = _handler$params5[0],
          _k3 = _handler$params5[1],
          _i4 = _handler$params5[2];

      var _parentPath3 = path.parentPath;

      _parentPath3.traverse({
        ArrowFunctionExpression: function ArrowFunctionExpression(_path) {
          if (_v3) {
            _path.scope.rename(_v3.name, value.name);
          }

          if (_k3) {
            _path.scope.rename(_k3.name, key.name);
          }

          if (_i4) {
            _path.scope.rename(_i4.name, iterable.name);
          }
        }
      });

      if (t.isExpression(body)) {
        return body;
      }
    }
  }

  if (t.isFunctionExpression(handler)) {
    var _body2 = handler.body.body;

    if (_body2.length === 1) {
      var _handler$params6 = _slicedToArray(handler.params, 3),
          _v4 = _handler$params6[0],
          _k4 = _handler$params6[1],
          _i5 = _handler$params6[2];

      var _parentPath4 = path.parentPath;
      var _node2 = _body2[0];

      _parentPath4.traverse({
        FunctionExpression: function FunctionExpression(_path) {
          if (_v4) {
            _path.scope.rename(_v4.name, value.name);
          }

          if (_k4) {
            _path.scope.rename(_k4.name, key.name);
          }

          if (_i5) {
            _path.scope.rename(_i5.name, iterable.name);
          }
        }
      });

      if (t.isExpression(_node2)) {
        return _node2;
      }

      if (t.isExpressionStatement(_node2)) {
        return _node2.expression;
      }

      if (t.isReturnStatement(_node2)) {
        return _node2.argument;
      }
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