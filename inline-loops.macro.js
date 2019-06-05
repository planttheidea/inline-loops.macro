const { createMacro, MacroError } = require('babel-plugin-macros');

function getDefaultResult(t, isObject) {
  return isObject ? t.objectExpression([]) : t.arrayExpression();
}

function getIds(scope) {
  const iterable = getUid(scope, 'iterable');
  const fn = getUid(scope, 'fn');
  const result = getUid(scope, 'result');
  const key = getUid(scope, 'key');
  const length = getUid(scope, 'length');
  const value = getUid(scope, 'value');

  return {
    fn,
    iterable,
    key,
    length,
    result,
    value,
  };
}

function getLoop({
  t,
  body,
  iterable,
  key,
  length,
  value,
  isDecrementing,
  isObject,
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
      t.variableDeclarator(
        length,
        t.memberExpression(iterable, t.identifier('length')),
      ),
    ];

    test = t.binaryExpression('<', key, length);
    update = t.updateExpression('++', key, true);
  }

  if (value) {
    assignments.push(t.variableDeclarator(value));
  }

  return t.forStatement(
    t.variableDeclaration('let', assignments),
    test,
    update,
    body,
  );
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

  callExpression.isFallback = true;

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
    const iterableVar = t.variableDeclaration('const', [
      t.variableDeclarator(iterable, object),
    ]);

    insertBefore.push(iterableVar);
  }

  if (
    !isCachedReference(t, handler)
    && t.isCallExpression(resultStatement)
    && resultStatement.isFallback
  ) {
    const handlerVar = t.variableDeclaration('const', [
      t.variableDeclarator(fn, handler),
    ]);

    insertBefore.push(handlerVar);
  }

  if (result) {
    const resultVar = t.variableDeclaration('let', [
      t.variableDeclarator(result, resultValue),
    ]);

    insertBefore.push(resultVar);
  }

  if (isObject) {
    const valueVar = t.variableDeclaration('let', [
      t.variableDeclarator(value),
    ]);

    insertBefore.push(valueVar);
  }

  insertBefore.push(loop);

  path.getStatementParent().insertBefore(insertBefore);
}

function isCachedReference(t, node) {
  return t.isIdentifier(node);
}

function handleEvery({
  t, path, object, handler, isDecrementing, isObject,
}) {
  const {
    fn, iterable, key, length, result, value,
  } = getIds(path.scope);

  const isHandlerCached = isCachedReference(t, handler);
  const isIterableCached = isCachedReference(t, object);

  const fnUsed = isHandlerCached ? handler : fn;
  const iterableUsed = isIterableCached ? object : iterable;

  const valueAssignment = t.expressionStatement(
    t.assignmentExpression(
      '=',
      value,
      t.memberExpression(iterableUsed, key, true),
    ),
  );
  const resultStatement = getResultStatement(
    t,
    handler,
    fnUsed,
    value,
    key,
    iterableUsed,
    path,
  );
  const expr = t.ifStatement(
    t.unaryExpression('!', resultStatement),
    t.blockStatement([
      t.expressionStatement(
        t.assignmentExpression('=', result, t.booleanLiteral(false)),
      ),
      t.breakStatement(),
    ]),
  );

  const loop = getLoop({
    t,
    body: t.blockStatement([valueAssignment, expr]),
    iterable: iterableUsed,
    key,
    length,
    isDecrementing,
    isObject,
    scope: path.scope,
    value,
  });

  insertBeforeParent({
    fn,
    handler,
    isObject,
    iterable,
    loop,
    object,
    path,
    result,
    resultStatement,
    resultValue: t.booleanLiteral(true),
    t,
    value,
  });

  path.parentPath.replaceWith(result);
}

function handleFilter({
  t, path, object, handler, isDecrementing, isObject,
}) {
  const {
    fn, iterable, key, length, result, value,
  } = getIds(path.scope);

  const isHandlerCached = isCachedReference(t, handler);
  const isIterableCached = isCachedReference(t, object);

  const fnUsed = isHandlerCached ? handler : fn;
  const iterableUsed = isIterableCached ? object : iterable;

  const valueAssignment = t.expressionStatement(
    t.assignmentExpression(
      '=',
      value,
      t.memberExpression(iterableUsed, key, true),
    ),
  );
  const resultAssignment = isObject
    ? t.assignmentExpression('=', t.memberExpression(result, key, true), value)
    : t.callExpression(t.memberExpression(result, t.identifier('push')), [
      value,
    ]);

  const resultStatement = getResultStatement(
    t,
    handler,
    fnUsed,
    value,
    key,
    iterableUsed,
    path,
  );
  const expr = t.ifStatement(
    resultStatement,
    t.expressionStatement(resultAssignment),
  );

  const loop = getLoop({
    t,
    body: t.blockStatement([valueAssignment, expr]),
    iterable: iterableUsed,
    key,
    length,
    value,
    isDecrementing,
    isObject,
    scope: path.scope,
  });

  insertBeforeParent({
    fn,
    handler,
    isObject,
    iterable,
    loop,
    object,
    path,
    result,
    resultStatement,
    resultValue: getDefaultResult(t, isObject),
    t,
    value,
  });

  path.parentPath.replaceWith(result);
}

function handleFind({
  t, path, object, handler, isDecrementing, isObject,
}) {
  const {
    fn, iterable, key, length, result, value,
  } = getIds(path.scope);

  const isHandlerCached = isCachedReference(t, handler);
  const isIterableCached = isCachedReference(t, object);

  const fnUsed = isHandlerCached ? handler : fn;
  const iterableUsed = isIterableCached ? object : iterable;

  const valueAssignment = t.expressionStatement(
    t.assignmentExpression(
      '=',
      value,
      t.memberExpression(iterableUsed, key, true),
    ),
  );
  const resultStatement = getResultStatement(
    t,
    handler,
    fnUsed,
    value,
    key,
    iterableUsed,
    path,
  );
  const expr = t.ifStatement(
    resultStatement,
    t.blockStatement([
      t.expressionStatement(t.assignmentExpression('=', result, value)),
      t.breakStatement(),
    ]),
  );

  const loop = getLoop({
    t,
    body: t.blockStatement([valueAssignment, expr]),
    iterable: iterableUsed,
    key,
    length,
    isDecrementing,
    isObject,
    scope: path.scope,
    value,
  });

  insertBeforeParent({
    fn,
    handler,
    isObject,
    iterable,
    loop,
    object,
    path,
    result,
    resultStatement,
    t,
    value,
  });

  path.parentPath.replaceWith(result);
}

function handleFindKey({
  t, path, object, handler, isDecrementing, isObject,
}) {
  const {
    fn, iterable, key, length, result, value,
  } = getIds(path.scope);

  const isHandlerCached = isCachedReference(t, handler);
  const isIterableCached = isCachedReference(t, object);

  const fnUsed = isHandlerCached ? handler : fn;
  const iterableUsed = isIterableCached ? object : iterable;

  const valueAssignment = t.expressionStatement(
    t.assignmentExpression(
      '=',
      value,
      t.memberExpression(iterableUsed, key, true),
    ),
  );
  const resultStatement = getResultStatement(
    t,
    handler,
    fnUsed,
    value,
    key,
    iterableUsed,
    path,
  );
  const expr = t.ifStatement(
    resultStatement,
    t.blockStatement([
      t.expressionStatement(t.assignmentExpression('=', result, key)),
      t.breakStatement(),
    ]),
  );

  const loop = getLoop({
    t,
    body: t.blockStatement([valueAssignment, expr]),
    iterable: iterableUsed,
    key,
    length,
    isDecrementing,
    isObject,
    scope: path.scope,
    value,
  });

  insertBeforeParent({
    fn,
    handler,
    isObject,
    iterable,
    loop,
    object,
    path,
    result,
    resultStatement,
    resultValue: isObject ? undefined : t.numericLiteral(-1),
    t,
    value,
  });

  path.parentPath.replaceWith(result);
}

function handleForEach({
  t, path, object, handler, isDecrementing, isObject,
}) {
  const {
    fn, iterable, key, length, value,
  } = getIds(path.scope);

  const isHandlerCached = isCachedReference(t, handler);
  const isIterableCached = isCachedReference(t, object);

  const fnUsed = isHandlerCached ? handler : fn;
  const iterableUsed = isIterableCached ? object : iterable;

  const valueAssignment = t.expressionStatement(
    t.assignmentExpression(
      '=',
      value,
      t.memberExpression(iterableUsed, key, true),
    ),
  );
  const resultStatement = getResultStatement(
    t,
    handler,
    fnUsed,
    value,
    key,
    iterableUsed,
    path,
  );
  const call = t.expressionStatement(resultStatement);

  const loop = getLoop({
    t,
    body: t.blockStatement([valueAssignment, call]),
    iterable: iterableUsed,
    key,
    length,
    isDecrementing,
    isObject,
    scope: path.scope,
    value,
  });

  insertBeforeParent({
    fn,
    handler,
    isObject,
    iterable,
    loop,
    object,
    path,
    resultStatement,
    t,
    value,
  });

  path.parentPath.remove();
}

function handleMap({
  t, path, object, handler, isDecrementing, isObject,
}) {
  const {
    fn, iterable, key, length, result, value,
  } = getIds(path.scope);

  const isHandlerCached = isCachedReference(t, handler);
  const isIterableCached = isCachedReference(t, object);

  const fnUsed = isHandlerCached ? handler : fn;
  const iterableUsed = isIterableCached ? object : iterable;

  const valueAssignment = t.expressionStatement(
    t.assignmentExpression(
      '=',
      value,
      t.memberExpression(iterableUsed, key, true),
    ),
  );
  const resultStatement = getResultStatement(
    t,
    handler,
    fnUsed,
    value,
    key,
    iterableUsed,
    path,
  );
  const expr = t.expressionStatement(
    isObject
      ? t.assignmentExpression(
        '=',
        t.memberExpression(result, key, true),
        resultStatement,
      )
      : t.callExpression(t.memberExpression(result, t.identifier('push')), [
        resultStatement,
      ]),
  );

  const loop = getLoop({
    t,
    body: t.blockStatement([valueAssignment, expr]),
    iterable: iterableUsed,
    key,
    length,
    isDecrementing,
    isObject,
    scope: path.scope,
    value,
  });

  insertBeforeParent({
    fn,
    handler,
    isObject,
    iterable,
    loop,
    object,
    path,
    result,
    resultStatement,
    resultValue: getDefaultResult(t, isObject),
    t,
    value,
  });

  path.parentPath.replaceWith(result);
}

function handleReduce({
  t,
  path,
  object,
  handler,
  initialValue,
  isDecrementing,
  isObject,
}) {
  const {
    fn, iterable, key, length, result, value,
  } = getIds(path.scope);

  const hasInitialValue = !!initialValue;
  const isHandlerCached = isCachedReference(t, handler);
  const isIterableCached = isCachedReference(t, object);

  const fnUsed = isHandlerCached ? handler : fn;
  const iterableUsed = isIterableCached ? object : iterable;

  const injected = [];

  let hasInitialValueId;

  if (!hasInitialValue) {
    if (isObject) {
      hasInitialValueId = getUid(path.scope, 'hasInitialValue');

      injected.push(
        t.variableDeclaration('let', [
          t.variableDeclarator(hasInitialValueId, t.booleanLiteral(false)),
        ]),
      );
    } else if (isDecrementing) {
      injected.push(
        t.variableDeclaration('const', [
          t.variableDeclarator(
            length,
            t.memberExpression(iterableUsed, t.identifier('length')),
          ),
        ]),
      );

      initialValue = t.memberExpression(
        iterableUsed,
        t.binaryExpression('-', length, t.numericLiteral(1)),
        true,
      );
    } else {
      initialValue = t.memberExpression(
        iterableUsed,
        t.numericLiteral(0),
        true,
      );
    }
  }

  if (isObject) {
    injected.push(t.variableDeclaration('let', [t.variableDeclarator(value)]));
  }

  const valueAssignment = t.expressionStatement(
    t.assignmentExpression(
      '=',
      value,
      t.memberExpression(iterableUsed, key, true),
    ),
  );
  const call = t.callExpression(fnUsed, [result, value, key, iterableUsed]);
  const resultAssignment = t.assignmentExpression('=', result, call);

  let block;

  if (!hasInitialValue && isObject) {
    const ifHasInitialValue = t.ifStatement(
      hasInitialValueId,
      t.blockStatement([
        valueAssignment,
        t.expressionStatement(resultAssignment),
      ]),
      t.blockStatement([
        t.expressionStatement(
          t.assignmentExpression('=', hasInitialValueId, t.booleanLiteral(true)),
        ),
        t.expressionStatement(
          t.assignmentExpression(
            '=',
            result,
            t.memberExpression(iterableUsed, key, true),
          ),
        ),
      ]),
    );

    block = [ifHasInitialValue];
  } else {
    block = [valueAssignment, t.expressionStatement(resultAssignment)];
  }

  const loop = getLoop({
    t,
    body: t.blockStatement(block),
    iterable: iterableUsed,
    key,
    length,
    isDecrementing,
    isObject,
    scope: path.scope,
    value,
  });

  if (!hasInitialValue && !isObject) {
    const keyValue = loop.init.declarations.find(
      ({ id }) => id.name === key.name,
    );

    if (isDecrementing) {
      keyValue.init.left = length;
      keyValue.init.right = t.numericLiteral(2);
    } else {
      keyValue.init = t.numericLiteral(1);
    }
  }

  const insertBefore = [];

  if (iterableUsed === iterable) {
    const iterableVar = t.variableDeclaration('const', [
      t.variableDeclarator(iterable, object),
    ]);

    insertBefore.push(iterableVar);
  }

  insertBefore.push(...injected);

  if (fnUsed === fn) {
    const handlerVar = t.variableDeclaration('const', [
      t.variableDeclarator(fn, handler),
    ]);

    insertBefore.push(handlerVar);
  }

  const resultVar = t.variableDeclaration('let', [
    t.variableDeclarator(result, initialValue),
  ]);

  insertBefore.push(resultVar);

  insertBefore.push(loop);

  path.getStatementParent().insertBefore(insertBefore);

  path.parentPath.replaceWith(result);
}

function handleSome({
  t, path, object, handler, isDecrementing, isObject,
}) {
  const {
    fn, iterable, key, length, result, value,
  } = getIds(path.scope);

  const isHandlerCached = isCachedReference(t, handler);
  const isIterableCached = isCachedReference(t, object);

  const fnUsed = isHandlerCached ? handler : fn;
  const iterableUsed = isIterableCached ? object : iterable;

  const valueAssignment = t.expressionStatement(
    t.assignmentExpression(
      '=',
      value,
      t.memberExpression(iterableUsed, key, true),
    ),
  );
  const resultStatement = getResultStatement(
    t,
    handler,
    fnUsed,
    value,
    key,
    iterableUsed,
    path,
  );
  const expr = t.ifStatement(
    resultStatement,
    t.blockStatement([
      t.expressionStatement(
        t.assignmentExpression('=', result, t.booleanLiteral(true)),
      ),
      t.breakStatement(),
    ]),
  );

  const loop = getLoop({
    t,
    body: t.blockStatement([valueAssignment, expr]),
    iterable: iterableUsed,
    key,
    length,
    isDecrementing,
    isObject,
    scope: path.scope,
    value,
  });

  insertBeforeParent({
    fn,
    handler,
    isObject,
    iterable,
    loop,
    object,
    path,
    result,
    resultStatement,
    resultValue: t.booleanLiteral(false),
    t,
    value,
  });

  path.parentPath.replaceWith(result);
}

const METHODS = [
  'every',
  'filter',
  'find',
  'findIndex',
  'findKey',
  'forEach',
  'map',
  'reduce',
  'some',
];
const ARRAY_ONLY_METHODS = ['findIndex'];
const OBJECT_ONLY_METHODS = ['findKey'];

function getCallTypes(references, method) {
  const isArrayOnly = ARRAY_ONLY_METHODS.includes(method);
  const isObjectOnly = OBJECT_ONLY_METHODS.includes(method);

  const decrementingMethod = `${method}Right`;
  const objectMethod = isObjectOnly ? method : `${method}Object`;

  const incrementingCalls = references[method] || [];
  const decrementingCalls = references[decrementingMethod] || [];
  const objectCalls = references[objectMethod] || [];

  return {
    decrementingCalls,
    decrementingMethod,
    incrementingCalls,
    isArrayOnly,
    isObjectOnly,
    objectCalls,
    objectMethod,
  };
}

function inlineLoops({ references, babel }) {
  const { types: t } = babel;

  const allMethods = [];

  METHODS.forEach((method) => {
    const {
      decrementingCalls,
      incrementingCalls,
      isArrayOnly,
      isObjectOnly,
      objectCalls,
    } = getCallTypes(references, method);

    if (isArrayOnly) {
      return allMethods.push(...incrementingCalls, ...decrementingCalls);
    }

    if (isObjectOnly) {
      return allMethods.push(...objectCalls);
    }

    return allMethods.push(...incrementingCalls, ...decrementingCalls, ...objectCalls);
  });

  const handlers = {
    every: handleEvery,
    filter: handleFilter,
    find: handleFind,
    findIndex: handleFindKey,
    findKey: handleFindKey,
    forEach: handleForEach,
    map: handleMap,
    reduce: handleReduce,
    some: handleSome,
  };

  function createHandler(name, transform, isDecrementing, isObject) {
    return function _transform(path) {
      if (path.findParent(_path => _path.isConditionalExpression())) {
        throw new MacroError(
          `You cannot use ${name} in a conditional expression.`,
        );
      }

      const { callee } = path.parentPath.parent;

      if (callee) {
        let ancestorPath = path.parentPath;

        while (ancestorPath) {
          if (ancestorPath.node && ancestorPath.node.body) {
            break;
          }

          if (t.isCallExpression(ancestorPath)) {
            const { expression } = ancestorPath.parent;
            const caller = expression
              ? expression.callee
              : ancestorPath.parent.callee;

            if (
              allMethods.find(
                ({ node }) => node === caller && node !== path.node,
              )
            ) {
              throw new MacroError(
                `You cannot nest looper methods. You should store the results of ${name} to a variable, and then call ${
                  path.parentPath.parent.callee.name
                } with it.`,
              );
            }
          }

          ancestorPath = ancestorPath.parentPath;
        }
      }

      const [object, handler, initialValue] = path.parent.arguments;

      transform({
        t,
        path,
        object,
        handler,
        initialValue,
        isDecrementing,
        isObject,
      });
    };
  }

  METHODS.forEach((method) => {
    const {
      decrementingCalls,
      decrementingMethod,
      incrementingCalls,
      isArrayOnly,
      isObjectOnly,
      objectCalls,
      objectMethod,
    } = getCallTypes(references, method);

    if (!isObjectOnly) {
      incrementingCalls.forEach(createHandler(method, handlers[method]));
      decrementingCalls.forEach(
        createHandler(decrementingMethod, handlers[method], true),
      );
    }

    if (!isArrayOnly) {
      objectCalls.forEach(
        createHandler(objectMethod, handlers[method], false, true),
      );
    }
  });
}

module.exports = createMacro(inlineLoops);
