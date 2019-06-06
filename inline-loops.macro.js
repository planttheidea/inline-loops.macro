const { createMacro, MacroError } = require('babel-plugin-macros');

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
    const iterableVar = t.variableDeclaration('const', [
      t.variableDeclarator(iterable, object),
    ]);

    insertBefore.push(iterableVar);
  }

  if (
    !isCachedReference(t, handler)
    && t.isCallExpression(resultStatement)
    && resultStatement.__inlineLoopsMacroFallback
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
    decrementingCalls: decrementingCalls.map(path => ({
      method: decrementingMethod,
      path,
      sourceMethod: method,
      type: 'decrementing',
    })),
    decrementingMethod,
    incrementingCalls: incrementingCalls.map(path => ({
      method,
      path,
      sourceMethod: method,
      type: 'incrementing',
    })),
    isArrayOnly,
    isObjectOnly,
    objectCalls: objectCalls.map(path => ({
      method: objectMethod,
      path,
      sourceMethod: method,
      type: 'object',
    })),
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

  allMethods.forEach(({ path }) => {
    path.node.__inlineLoopsMacro = true;
  });

  allMethods.sort(({ path: a }, { path: b }) => {
    const aContainer = a.container;
    const bContainer = b.container;

    if (aContainer.arguments) {
      const [iterableA] = aContainer.arguments;

      if (
        t.isCallExpression(iterableA)
        && iterableA.callee.__inlineLoopsMacro
        && iterableA.callee === b.node
      ) {
        return 1;
      }
    }

    if (bContainer.arguments) {
      const [iterableB] = bContainer.arguments;

      if (
        t.isCallExpression(iterableB)
        && iterableB.callee.__inlineLoopsMacro
        && iterableB.callee === a.node
      ) {
        return -1;
      }
    }

    const aStart = a.node.loc.start;
    const bStart = b.node.loc.start;

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

  function createTransformer(name, transform, isDecrementing, isObject) {
    return function _transform(path) {
      if (path.findParent(_path => _path.isConditionalExpression())) {
        throw new MacroError(
          `You cannot use ${name} in a conditional expression.`,
        );
      } const args = path.parent.arguments;

      if (args.some(arg => t.isSpreadElement(arg))) {
        throw new MacroError('You cannot use spread arguments with the macro, please declare the arguments explicitly.');
      }

      const [object, handler, initialValue] = args;
      const isHandlerMacro = allMethods.find(
        ({ path: methodPath }) => methodPath.node !== path.node && handler === methodPath.node,
      );

      if (isHandlerMacro) {
        throw new MacroError('You cannot use the macro directly as a handler, please wrap it in a function call.');
      }

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

  allMethods.forEach(({
    method, path, sourceMethod, type,
  }) => {
    const isDecrementing = type === 'decrementing';
    const isObject = type === 'object';

    const handler = createTransformer(
      method,
      handlers[sourceMethod],
      isDecrementing,
      isObject,
    );

    handler(path);
  });
}

module.exports = createMacro(inlineLoops);
