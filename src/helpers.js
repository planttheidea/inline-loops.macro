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

function getInjectedValues(t, path, {
  fn, getResult, handler, iterable, key, value,
}) {
  const valueAssignment = t.expressionStatement(
    t.assignmentExpression('=', value, t.memberExpression(iterable, key, true)),
  );
  const resultApplication = getResultApplication(t, handler, fn, value, key, iterable, path);
  const resultStatement = resultApplication.pop();
  const result = getResult(resultStatement);

  const block = [valueAssignment];

  if (resultApplication.length) {
    block.push(...resultApplication);
  }

  block.push(result);

  return {
    body: t.blockStatement(block),
    resultStatement,
  };
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

function normalizeHandler(t, handler, path, {
  iterable, key, result, value,
}) {
  function createRename({
    i, k, r, v,
  }) {
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

  let r;
  let v;
  let k;
  let i;

  if (result) {
    [r, v, k, i] = handler.params;
  } else {
    [v, k, i] = handler.params;
  }

  if (t.isArrowFunctionExpression(handler)) {
    path.parentPath.traverse({
      ArrowFunctionExpression: createRename({
        r,
        v,
        k,
        i,
      }),
    });
  } else {
    path.parentPath.traverse({
      FunctionExpression: createRename({
        r,
        v,
        k,
        i,
      }),
    });
  }
}

function getResultApplication(t, handler, fn, value, key, iterable, path, result) {
  const callParams = result ? [result, value, key, iterable] : [value, key, iterable];

  if (t.isArrowFunctionExpression(handler) || t.isFunctionExpression(handler)) {
    let { body } = handler;

    if (t.isBlockStatement(body)) {
      // eslint-disable-next-line prefer-destructuring
      body = body.body;

      const { parentPath } = path;

      let returnCount = 0;

      parentPath.traverse({
        ReturnStatement(_path) {
          returnCount++;

          if (_path.parentPath.node !== handler.body) {
            returnCount++;
          }
        },
      });

      if (returnCount < 2) {
        if (!handler.params.every(param => t.isIdentifier(param))) {
          const injectedParamAssigns = handler.params.reduce((injected, param, index) => {
            if (t.isIdentifier(param)) {
              return injected;
            }

            injected.push(
              t.variableDeclaration('const', [t.variableDeclarator(param, callParams[index])]),
            );

            handler.params[index] = callParams[index];

            return injected;
          }, []);

          body.unshift(...injectedParamAssigns);
        }

        normalizeHandler(t, handler, path, {
          result,
          iterable,
          key,
          value,
        });

        if (body.length === 1) {
          const node = body[0];

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
          const ret = body[body.length - 1];

          if (t.isReturnStatement(ret)) {
            body[body.length - 1] = ret.argument;
          }

          return body;
        }
      }
    } else if (t.isExpression(body)) {
      normalizeHandler(t, handler, path, {
        result,
        iterable,
        key,
        value,
      });

      return [body];
    }
  }

  const callExpression = t.callExpression(fn, callParams);

  callExpression.__inlineLoopsMacroFallback = true;

  return [callExpression];
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
  getInjectedValues,
  getLoop,
  getUid,
  getResultApplication,
  insertBeforeParent,
  isCachedReference,
};
