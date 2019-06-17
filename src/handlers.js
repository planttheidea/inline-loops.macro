const {
  getDefaultResult,
  getIds,
  getInjectedValues,
  getLoop,
  getUid,
  getResultApplication,
  insertBeforeParent,
  isCachedReference,
} = require('./helpers');

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

  const { body, resultStatement } = getInjectedValues(t, path, {
    fn: fnUsed,
    getResult(resultStatement) {
      return t.ifStatement(
        t.unaryExpression('!', resultStatement),
        t.blockStatement([
          t.expressionStatement(t.assignmentExpression('=', result, t.booleanLiteral(false))),
          t.breakStatement(),
        ]),
      );
    },
    handler,
    iterable: iterableUsed,
    key,
    value,
  });

  const loop = getLoop({
    t,
    body,
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

  const { body, resultStatement } = getInjectedValues(t, path, {
    fn: fnUsed,
    getResult(resultStatement) {
      return t.ifStatement(
        resultStatement,
        t.expressionStatement(
          isObject
            ? t.assignmentExpression('=', t.memberExpression(result, key, true), value)
            : t.callExpression(t.memberExpression(result, t.identifier('push')), [value]),
        ),
      );
    },
    handler,
    iterable: iterableUsed,
    key,
    value,
  });

  const loop = getLoop({
    t,
    body,
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

  const { body, resultStatement } = getInjectedValues(t, path, {
    fn: fnUsed,
    getResult(resultStatement) {
      return t.ifStatement(
        resultStatement,
        t.blockStatement([
          t.expressionStatement(t.assignmentExpression('=', result, value)),
          t.breakStatement(),
        ]),
      );
    },
    handler,
    iterable: iterableUsed,
    key,
    value,
  });

  const loop = getLoop({
    t,
    body,
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

  const { body, resultStatement } = getInjectedValues(t, path, {
    fn: fnUsed,
    getResult(resultStatement) {
      return t.ifStatement(
        resultStatement,
        t.blockStatement([
          t.expressionStatement(t.assignmentExpression('=', result, key)),
          t.breakStatement(),
        ]),
      );
    },
    handler,
    iterable: iterableUsed,
    key,
    value,
  });

  const loop = getLoop({
    t,
    body,
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

function handleFlatMap({
  t, path, object, handler, isDecrementing, isObject,
}) {
  const {
    fn, iterable, key, length, result, value,
  } = getIds(path.scope);

  const isHandlerCached = isCachedReference(t, handler);
  const isIterableCached = isCachedReference(t, object);

  const fnUsed = isHandlerCached ? handler : fn;
  const iterableUsed = isIterableCached ? object : iterable;

  const { body, resultStatement } = getInjectedValues(t, path, {
    fn: fnUsed,
    getResult(resultStatement) {
      return t.expressionStatement(
        t.callExpression(
          t.memberExpression(
            t.memberExpression(result, t.identifier('push')),
            t.identifier('apply'),
          ),
          [result, resultStatement],
        ),
      );
    },
    handler,
    iterable: iterableUsed,
    key,
    value,
  });

  const loop = getLoop({
    t,
    body,
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

  const { body, resultStatement } = getInjectedValues(t, path, {
    fn: fnUsed,
    getResult(resultStatement) {
      return t.isExpression(resultStatement)
        ? t.expressionStatement(resultStatement)
        : resultStatement;
    },
    handler,
    iterable: iterableUsed,
    key,
    value,
  });

  const loop = getLoop({
    t,
    body,
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

  const { body, resultStatement } = getInjectedValues(t, path, {
    fn: fnUsed,
    getResult(resultStatement) {
      return t.expressionStatement(
        isDecrementing
          ? t.assignmentExpression(
            '=',
            t.memberExpression(result, t.memberExpression(result, t.identifier('length')), true),
            resultStatement,
          )
          : t.assignmentExpression('=', t.memberExpression(result, key, true), resultStatement),
      );
    },
    handler,
    iterable: iterableUsed,
    key,
    value,
  });

  const loop = getLoop({
    t,
    body,
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
  t, path, object, handler, initialValue, isDecrementing, isObject,
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
          t.variableDeclarator(length, t.memberExpression(iterableUsed, t.identifier('length'))),
        ]),
      );

      initialValue = t.memberExpression(
        iterableUsed,
        t.binaryExpression('-', length, t.numericLiteral(1)),
        true,
      );
    } else {
      initialValue = t.memberExpression(iterableUsed, t.numericLiteral(0), true);
    }
  }

  if (isObject) {
    injected.push(t.variableDeclaration('let', [t.variableDeclarator(value)]));
  }

  const valueAssignment = t.expressionStatement(
    t.assignmentExpression('=', value, t.memberExpression(iterableUsed, key, true)),
  );
  const resultApplication = getResultApplication(
    t,
    handler,
    fnUsed,
    value,
    key,
    iterableUsed,
    path,
    result,
  );

  const resultStatement = resultApplication.pop();

  const resultAssignment = t.assignmentExpression('=', result, resultStatement);

  let block;

  if (!hasInitialValue && isObject) {
    const mainBlock = [valueAssignment, ...resultApplication];

    if (resultAssignment.left.name !== resultAssignment.right.name) {
      mainBlock.push(t.expressionStatement(resultAssignment));
    }

    const ifHasInitialValue = t.ifStatement(
      hasInitialValueId,
      t.blockStatement(mainBlock),
      t.blockStatement([
        t.expressionStatement(
          t.assignmentExpression('=', hasInitialValueId, t.booleanLiteral(true)),
        ),
        t.expressionStatement(
          t.assignmentExpression('=', result, t.memberExpression(iterableUsed, key, true)),
        ),
      ]),
    );

    block = [ifHasInitialValue];
  } else {
    block = [valueAssignment, ...resultApplication];

    if (resultAssignment.left.name !== resultAssignment.right.name) {
      block.push(t.expressionStatement(resultAssignment));
    }
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
    const keyValue = loop.init.declarations.find(({ id }) => id.name === key.name);

    if (isDecrementing) {
      keyValue.init.left = length;
      keyValue.init.right = t.numericLiteral(2);
    } else {
      keyValue.init = t.numericLiteral(1);
    }
  }

  const insertBefore = [];

  if (iterableUsed === iterable) {
    const iterableVar = t.variableDeclaration('const', [t.variableDeclarator(iterable, object)]);

    insertBefore.push(iterableVar);
  }

  insertBefore.push(...injected);

  if (fnUsed === fn && resultStatement.__inlineLoopsMacroFallback) {
    const handlerVar = t.variableDeclaration('const', [t.variableDeclarator(fn, handler)]);

    insertBefore.push(handlerVar);
  }

  const resultVar = t.variableDeclaration('let', [t.variableDeclarator(result, initialValue)]);

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

  const { body, resultStatement } = getInjectedValues(t, path, {
    fn: fnUsed,
    getResult(resultStatement) {
      return t.ifStatement(
        resultStatement,
        t.blockStatement([
          t.expressionStatement(t.assignmentExpression('=', result, t.booleanLiteral(true))),
          t.breakStatement(),
        ]),
      );
    },
    handler,
    iterable: iterableUsed,
    key,
    value,
  });

  const loop = getLoop({
    t,
    body,
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

module.exports = {
  handleEvery,
  handleFilter,
  handleFind,
  handleFindKey,
  handleFlatMap,
  handleForEach,
  handleMap,
  handleReduce,
  handleSome,
};
