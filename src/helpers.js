function getDefaultResult(t, isObject) {
  return isObject ? t.objectExpression([]) : t.arrayExpression();
}

const ID_TYPES = ['fn', 'iterable', 'key', 'length', 'result', 'value'];

function getIds(scope) {
  return ID_TYPES.reduce((ids, type) => {
    ids[type] = getUid(scope, type);

    return ids;
  }, {});
}

function getLoop({
  t, body, iterable, key, length, value, isDecrementing, isObject,
}) {
  if (isObject) {
    const left = t.variableDeclaration('let', [t.variableDeclarator(key)]);
    const right = iterable;

    return t.forInStatement(left, right, body);
  }

  let assignments;
  let test;
  let update;

  if (isDecrementing) {
    assignments = [
      t.variableDeclarator(
        key,
        t.binaryExpression(
          '-',
          t.memberExpression(iterable, t.identifier('length')),
          t.numericLiteral(1),
        ),
      ),
    ];

    test = t.binaryExpression('>=', key, t.numericLiteral(0));
    update = t.updateExpression('--', key, true);
  } else {
    assignments = [
      t.variableDeclarator(key, t.numericLiteral(0)),
      t.variableDeclarator(length, t.memberExpression(iterable, t.identifier('length'))),
    ];

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
    let { body } = handler;

    if (t.isBlockStatement(body)) {
      // eslint-disable-next-line prefer-destructuring
      body = body.body;

      if (body.length === 1) {
        const [r, v, k, i] = handler.params;
        const { parentPath } = path;
        const node = body[0];

        parentPath.traverse({
          ArrowFunctionExpression(_path) {
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
          },
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
      const [r, v, k, i] = handler.params;
      const { parentPath } = path;

      parentPath.traverse({
        ArrowFunctionExpression(_path) {
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
        },
      });

      if (t.isExpression(body)) {
        return body;
      }
    }
  }

  if (t.isFunctionExpression(handler)) {
    const { body } = handler.body;

    if (body.length === 1) {
      const [r, v, k, i] = handler.params;
      const { parentPath } = path;
      const node = body[0];

      parentPath.traverse({
        FunctionExpression(_path) {
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
        },
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
  }

  const callExpression = t.callExpression(fn, [result, value, key, iterable]);

  callExpression.__inlineLoopsMacroFallback = true;

  return callExpression;
}

function getResultStatement(t, handler, fn, value, key, iterable, path) {
  if (t.isArrowFunctionExpression(handler)) {
    let { body } = handler;

    if (t.isBlockStatement(body)) {
      // eslint-disable-next-line prefer-destructuring
      body = body.body;

      if (body.length === 1) {
        const [v, k, i] = handler.params;
        const { parentPath } = path;
        const node = body[0];

        parentPath.traverse({
          ArrowFunctionExpression(_path) {
            if (v) {
              _path.scope.rename(v.name, value.name);
            }

            if (k) {
              _path.scope.rename(k.name, key.name);
            }

            if (i) {
              _path.scope.rename(i.name, iterable.name);
            }
          },
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
      const [v, k, i] = handler.params;
      const { parentPath } = path;

      parentPath.traverse({
        ArrowFunctionExpression(_path) {
          if (v) {
            _path.scope.rename(v.name, value.name);
          }

          if (k) {
            _path.scope.rename(k.name, key.name);
          }

          if (i) {
            _path.scope.rename(i.name, iterable.name);
          }
        },
      });

      if (t.isExpression(body)) {
        return body;
      }
    }
  }

  if (t.isFunctionExpression(handler)) {
    const { body } = handler.body;

    if (body.length === 1) {
      const [v, k, i] = handler.params;
      const { parentPath } = path;
      const node = body[0];

      parentPath.traverse({
        FunctionExpression(_path) {
          if (v) {
            _path.scope.rename(v.name, value.name);
          }

          if (k) {
            _path.scope.rename(k.name, key.name);
          }

          if (i) {
            _path.scope.rename(i.name, iterable.name);
          }
        },
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
  }

  const callExpression = t.callExpression(fn, [value, key, iterable]);

  callExpression.__inlineLoopsMacroFallback = true;

  return callExpression;
}

function getUid(scope, name) {
  return scope.generateUidIdentifier(name);
}

function insertBeforeParent({
  fn,
  handler,
  isObject,
  iterable,
  loop,
  object,
  path,
  result,
  resultStatement,
  resultValue,
  t,
  value,
}) {
  const insertBefore = [];

  if (!isCachedReference(t, object)) {
    const iterableVar = t.variableDeclaration('const', [t.variableDeclarator(iterable, object)]);

    insertBefore.push(iterableVar);
  }

  if (
    !isCachedReference(t, handler)
    && t.isCallExpression(resultStatement)
    && resultStatement.__inlineLoopsMacroFallback
  ) {
    const handlerVar = t.variableDeclaration('const', [t.variableDeclarator(fn, handler)]);

    insertBefore.push(handlerVar);
  }

  if (result) {
    const resultVar = t.variableDeclaration('let', [t.variableDeclarator(result, resultValue)]);

    insertBefore.push(resultVar);
  }

  if (isObject) {
    const valueVar = t.variableDeclaration('let', [t.variableDeclarator(value)]);

    insertBefore.push(valueVar);
  }

  insertBefore.push(loop);

  path.getStatementParent().insertBefore(insertBefore);
}

function isCachedReference(t, node) {
  return t.isIdentifier(node);
}

module.exports = {
  getDefaultResult,
  getIds,
  getLoop,
  getUid,
  getReduceResultStatement,
  getResultStatement,
  insertBeforeParent,
  isCachedReference,
};
