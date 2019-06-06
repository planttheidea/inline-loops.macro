"use strict";

var _require = require('./helpers'),
    getDefaultResult = _require.getDefaultResult,
    getIds = _require.getIds,
    getLoop = _require.getLoop,
    getUid = _require.getUid,
    getResultStatement = _require.getResultStatement,
    insertBeforeParent = _require.insertBeforeParent,
    isCachedReference = _require.isCachedReference;

function handleEvery(_ref) {
  var t = _ref.t,
      path = _ref.path,
      object = _ref.object,
      handler = _ref.handler,
      isDecrementing = _ref.isDecrementing,
      isObject = _ref.isObject;

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
  var valueAssignment = t.expressionStatement(t.assignmentExpression('=', value, t.memberExpression(iterableUsed, key, true)));
  var resultStatement = getResultStatement(t, handler, fnUsed, value, key, iterableUsed, path);
  var expr = t.ifStatement(t.unaryExpression('!', resultStatement), t.blockStatement([t.expressionStatement(t.assignmentExpression('=', result, t.booleanLiteral(false))), t.breakStatement()]));
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

function handleFilter(_ref2) {
  var t = _ref2.t,
      path = _ref2.path,
      object = _ref2.object,
      handler = _ref2.handler,
      isDecrementing = _ref2.isDecrementing,
      isObject = _ref2.isObject;

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
  var valueAssignment = t.expressionStatement(t.assignmentExpression('=', value, t.memberExpression(iterableUsed, key, true)));
  var resultAssignment = isObject ? t.assignmentExpression('=', t.memberExpression(result, key, true), value) : t.callExpression(t.memberExpression(result, t.identifier('push')), [value]);
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

function handleFind(_ref3) {
  var t = _ref3.t,
      path = _ref3.path,
      object = _ref3.object,
      handler = _ref3.handler,
      isDecrementing = _ref3.isDecrementing,
      isObject = _ref3.isObject;

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
  var valueAssignment = t.expressionStatement(t.assignmentExpression('=', value, t.memberExpression(iterableUsed, key, true)));
  var resultStatement = getResultStatement(t, handler, fnUsed, value, key, iterableUsed, path);
  var expr = t.ifStatement(resultStatement, t.blockStatement([t.expressionStatement(t.assignmentExpression('=', result, value)), t.breakStatement()]));
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

function handleFindKey(_ref4) {
  var t = _ref4.t,
      path = _ref4.path,
      object = _ref4.object,
      handler = _ref4.handler,
      isDecrementing = _ref4.isDecrementing,
      isObject = _ref4.isObject;

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
  var valueAssignment = t.expressionStatement(t.assignmentExpression('=', value, t.memberExpression(iterableUsed, key, true)));
  var resultStatement = getResultStatement(t, handler, fnUsed, value, key, iterableUsed, path);
  var expr = t.ifStatement(resultStatement, t.blockStatement([t.expressionStatement(t.assignmentExpression('=', result, key)), t.breakStatement()]));
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

function handleForEach(_ref5) {
  var t = _ref5.t,
      path = _ref5.path,
      object = _ref5.object,
      handler = _ref5.handler,
      isDecrementing = _ref5.isDecrementing,
      isObject = _ref5.isObject;

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
  var valueAssignment = t.expressionStatement(t.assignmentExpression('=', value, t.memberExpression(iterableUsed, key, true)));
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

function handleMap(_ref6) {
  var t = _ref6.t,
      path = _ref6.path,
      object = _ref6.object,
      handler = _ref6.handler,
      isDecrementing = _ref6.isDecrementing,
      isObject = _ref6.isObject;

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
  var valueAssignment = t.expressionStatement(t.assignmentExpression('=', value, t.memberExpression(iterableUsed, key, true)));
  var resultStatement = getResultStatement(t, handler, fnUsed, value, key, iterableUsed, path);
  var expr = t.expressionStatement(isObject ? t.assignmentExpression('=', t.memberExpression(result, key, true), resultStatement) : t.callExpression(t.memberExpression(result, t.identifier('push')), [resultStatement]));
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

function handleReduce(_ref7) {
  var t = _ref7.t,
      path = _ref7.path,
      object = _ref7.object,
      handler = _ref7.handler,
      initialValue = _ref7.initialValue,
      isDecrementing = _ref7.isDecrementing,
      isObject = _ref7.isObject;

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
      hasInitialValueId = getUid(path.scope, 'hasInitialValue');
      injected.push(t.variableDeclaration('let', [t.variableDeclarator(hasInitialValueId, t.booleanLiteral(false))]));
    } else if (isDecrementing) {
      injected.push(t.variableDeclaration('const', [t.variableDeclarator(length, t.memberExpression(iterableUsed, t.identifier('length')))]));
      initialValue = t.memberExpression(iterableUsed, t.binaryExpression('-', length, t.numericLiteral(1)), true);
    } else {
      initialValue = t.memberExpression(iterableUsed, t.numericLiteral(0), true);
    }
  }

  if (isObject) {
    injected.push(t.variableDeclaration('let', [t.variableDeclarator(value)]));
  }

  var valueAssignment = t.expressionStatement(t.assignmentExpression('=', value, t.memberExpression(iterableUsed, key, true)));
  var call = t.callExpression(fnUsed, [result, value, key, iterableUsed]);
  var resultAssignment = t.assignmentExpression('=', result, call);
  var block;

  if (!hasInitialValue && isObject) {
    var ifHasInitialValue = t.ifStatement(hasInitialValueId, t.blockStatement([valueAssignment, t.expressionStatement(resultAssignment)]), t.blockStatement([t.expressionStatement(t.assignmentExpression('=', hasInitialValueId, t.booleanLiteral(true))), t.expressionStatement(t.assignmentExpression('=', result, t.memberExpression(iterableUsed, key, true)))]));
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
    var keyValue = loop.init.declarations.find(function (_ref8) {
      var id = _ref8.id;
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
    var iterableVar = t.variableDeclaration('const', [t.variableDeclarator(iterable, object)]);
    insertBefore.push(iterableVar);
  }

  insertBefore.push.apply(insertBefore, injected);

  if (fnUsed === fn) {
    var handlerVar = t.variableDeclaration('const', [t.variableDeclarator(fn, handler)]);
    insertBefore.push(handlerVar);
  }

  var resultVar = t.variableDeclaration('let', [t.variableDeclarator(result, initialValue)]);
  insertBefore.push(resultVar);
  insertBefore.push(loop);
  path.getStatementParent().insertBefore(insertBefore);
  path.parentPath.replaceWith(result);
}

function handleSome(_ref9) {
  var t = _ref9.t,
      path = _ref9.path,
      object = _ref9.object,
      handler = _ref9.handler,
      isDecrementing = _ref9.isDecrementing,
      isObject = _ref9.isObject;

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
  var valueAssignment = t.expressionStatement(t.assignmentExpression('=', value, t.memberExpression(iterableUsed, key, true)));
  var resultStatement = getResultStatement(t, handler, fnUsed, value, key, iterableUsed, path);
  var expr = t.ifStatement(resultStatement, t.blockStatement([t.expressionStatement(t.assignmentExpression('=', result, t.booleanLiteral(true))), t.breakStatement()]));
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

module.exports = {
  handleEvery: handleEvery,
  handleFilter: handleFilter,
  handleFind: handleFind,
  handleFindKey: handleFindKey,
  handleForEach: handleForEach,
  handleMap: handleMap,
  handleReduce: handleReduce,
  handleSome: handleSome
};