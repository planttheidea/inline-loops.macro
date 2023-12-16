const { MacroError, createMacro } = require('babel-plugin-macros');
const { createTemplates } = require('./templates');
const { createTraverseConfigs } = require('./traverse');
const {
  getCachedFnArgs,
  getLocalName,
  handleArrowFunctionExpressionUse,
  handleInvalidUsage,
  processNestedInlineLoopMacros,
  rename,
  replaceOrRemove,
} = require('./utils');

function myMacro({ references, babel }) {
  const { template, types: t } = babel;
  const {
    every = [],
    everyObject = [],
    everyRight = [],
    filter = [],
    filterObject = [],
    filterRight = [],
    find = [],
    findObject = [],
    findLast = [],
    findIndex = [],
    findKey = [],
    findLastIndex = [],
    flatMap = [],
    flatMapRight = [],
    forEach = [],
    forEachObject = [],
    forEachRight = [],
    map = [],
    mapObject = [],
    mapRight = [],
    reduce = [],
    reduceObject = [],
    reduceRight = [],
    some = [],
    someObject = [],
    someRight = [],
  } = references;

  const templates = createTemplates(template);
  const traverseConfigs = createTraverseConfigs(babel);

  const handlers = {
    every: createHandleEverySome('every-left'),
    everyObject: createHandleEverySome('every-object'),
    everyRight: createHandleEverySome('every-right'),
    filter: createHandleMapFilterForEach('filter-left'),
    filterObject: createHandleMapFilterForEach('filter-object'),
    filterRight: createHandleMapFilterForEach('filter-right'),
    forEach: createHandleMapFilterForEach('for-each-left'),
    forEachObject: createHandleMapFilterForEach('for-each-object'),
    forEachRight: createHandleMapFilterForEach('for-each-right'),
    find: createHandleFind('find-left'),
    findIndex: createHandleFind('find-index'),
    findKey: createHandleFind('find-key'),
    findLast: createHandleFind('find-last'),
    findLastIndex: createHandleFind('find-last-index'),
    findObject: createHandleFind('find-object'),
    flatMap: createHandleMapFilterForEach('flat-map-left'),
    flatMapRight: createHandleMapFilterForEach('flat-map-right'),
    map: createHandleMapFilterForEach('map-left'),
    mapObject: createHandleMapFilterForEach('map-object'),
    mapRight: createHandleMapFilterForEach('map-right'),
    reduce: createHandleReduce('left'),
    reduceObject: createHandleReduce('object'),
    reduceRight: createHandleReduce('right'),
    some: createHandleEverySome('some-left'),
    someObject: createHandleEverySome('some-object'),
    someRight: createHandleEverySome('some-right'),
  };

  function getInjectedBodyAndLogic({
    callback,
    isForEach,
    isReduce,
    local,
    path,
    statement,
  }) {
    const body = callback.get('body');
    const traverseState = {
      containsThis: false,
      count: 0,
      isForEach,
      value: null,
    };

    body.traverse(traverseConfigs.body, traverseState);

    const {
      containsThis: callbackContainsThis,
      count: returnCount,
      value: returnValue,
    } = traverseState;

    if (body.isBlockStatement()) {
      if (!callbackContainsThis) {
        if (returnCount < 2) {
          body.traverse(traverseConfigs.stripReturn, { isForEach });
        }

        if (returnCount === 0) {
          return {
            injectedBody: body.node.body,
            logic: t.identifier('undefined'),
          };
        }

        if (returnCount === 1) {
          return {
            injectedBody: body.node.body,
            logic: returnValue,
          };
        }
      }

      const localFnName = path.scope.generateUidIdentifier('fn');
      const localFn = templates.localVariable({
        LOCAL: localFnName,
        VALUE: callback.node,
      });

      statement.insertBefore(localFn);

      const logic = t.callExpression(
        localFnName,
        getCachedFnArgs(local, isReduce),
      );

      return {
        injectedBody: [],
        logic,
      };
    }

    if (callback.isFunction()) {
      return isForEach
        ? { injectedBody: body.node, logic: undefined }
        : { injectedBody: [], logic: body.node };
    }

    if (isForEach) {
      const injectedBody = [
        t.expressionStatement(
          t.callExpression(callback.node, getCachedFnArgs(local, isReduce)),
        ),
      ];

      return { injectedBody, logic: undefined };
    }

    const logic = t.callExpression(
      callback.node,
      getCachedFnArgs(local, isReduce),
    );

    return { injectedBody: [], logic };
  }

  function getLocalReferences(path, statement, isReduce) {
    const args = path.get('arguments');

    const [collection, callback] = args;

    let localCollection = collection.node;

    if (!collection.isIdentifier()) {
      localCollection = getLocalName(path, 'collection');

      const localVariable = templates.localVariable({
        LOCAL: localCollection,
        VALUE: collection.node,
      });

      statement.insertBefore(localVariable);
    }

    let accumulated;
    let value;
    let key;
    let scopedCollection;

    let localDestructuredRefName;

    if (callback.isFunction()) {
      if (isReduce) {
        [accumulated, value, key, scopedCollection] = callback.get('params');
      } else {
        [value, key, scopedCollection] = callback.get('params');
      }

      if (value && (value.isArrayPattern() || value.isObjectPattern())) {
        localDestructuredRefName =
          path.scope.generateUidIdentifier('destructured');

        const localVariable = templates.localVariable({
          LOCAL: value.node,
          VALUE: localDestructuredRefName,
        });

        const body = callback.get('body');

        if (!body.isBlockStatement()) {
          body.replaceWith(t.blockStatement([t.returnStatement(body.node)]));
        }

        body.unshiftContainer('body', localVariable);
        value.replaceWith(localDestructuredRefName);
      }
    }

    const localAccumulated = accumulated
      ? getLocalName(accumulated)
      : getLocalName(path, 'accumulated');
    const localKey = key ? getLocalName(key) : getLocalName(path, 'key');
    const localLength = getLocalName(path, 'length');

    let localValue;

    if (localDestructuredRefName) {
      localValue = localDestructuredRefName;
    } else {
      localValue = value ? getLocalName(value) : getLocalName(path, 'value');
    }

    if (accumulated) {
      rename(accumulated, localAccumulated.name);
    }

    if (value) {
      rename(value, localValue.name);
    }

    if (key) {
      rename(key, localKey.name);
    }

    if (scopedCollection) {
      rename(scopedCollection, localCollection.name);
    }

    return {
      accumulated: localAccumulated,
      collection: localCollection,
      key: localKey,
      length: localLength,
      value: localValue,
    };
  }

  function createHandleEverySome(type) {
    return function handleFilter(referencePath) {
      const path = referencePath.parentPath;

      if (!path.isCallExpression()) {
        return;
      }

      handleInvalidUsage({ handlers, path });
      handleArrowFunctionExpressionUse(path);

      const [collection, callback] = path.get('arguments');

      processNestedInlineLoopMacros(collection, handlers);

      const statement = path.getStatementParent();
      const local = getLocalReferences(path, statement);

      const { injectedBody, logic } = getInjectedBodyAndLogic({
        callback,
        local,
        path,
        statement,
      });

      const result = path.scope.generateUidIdentifier('result');
      const determination = path.scope.generateUidIdentifier('determination');

      let forLoop;

      switch (type) {
        case 'every-left':
          forLoop = templates.every({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            DETERMINATION: determination,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            VALUE: local.value,
          });
          break;

        case 'some-left':
          forLoop = templates.some({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            DETERMINATION: determination,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            VALUE: local.value,
          });
          break;

        case 'every-right':
          forLoop = templates.everyRight({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            DETERMINATION: determination,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value,
          });
          break;

        case 'some-right':
          forLoop = templates.someRight({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            DETERMINATION: determination,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value,
          });
          break;

        case 'every-object':
          forLoop = templates.everyObject({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            DETERMINATION: determination,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value,
          });
          break;

        case 'some-object':
          forLoop = templates.someObject({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            DETERMINATION: determination,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value,
          });
          break;

        default:
          throw new MacroError(`Invalid type ${type} provided`);
      }

      statement.insertBefore(forLoop);

      replaceOrRemove(path, determination);
    };
  }

  function createHandleFind(type) {
    return function handleFilter(referencePath) {
      const path = referencePath.parentPath;

      if (!path.isCallExpression()) {
        return;
      }

      handleInvalidUsage({ handlers, path });
      handleArrowFunctionExpressionUse(path);

      const [collection, callback] = path.get('arguments');

      processNestedInlineLoopMacros(collection, handlers);

      const statement = path.getStatementParent();
      const local = getLocalReferences(path, statement);

      const { injectedBody, logic } = getInjectedBodyAndLogic({
        callback,
        local,
        path,
        statement,
      });

      const result = path.scope.generateUidIdentifier('result');
      const match = path.scope.generateUidIdentifier('match');

      let forLoop;

      switch (type) {
        case 'find-left':
          forLoop = templates.find({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            MATCH: match,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            VALUE: local.value,
          });
          break;

        case 'find-index':
          forLoop = templates.findIndex({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            MATCH: match,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            VALUE: local.value,
          });
          break;

        case 'find-last':
          forLoop = templates.findLast({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            MATCH: match,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value,
          });
          break;

        case 'find-last-index':
          forLoop = templates.findLastIndex({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            MATCH: match,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value,
          });
          break;

        case 'find-object':
          forLoop = templates.findObject({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            MATCH: match,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value,
          });
          break;

        case 'find-key':
          forLoop = templates.findKey({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            MATCH: match,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value,
          });
          break;

        default:
          throw new MacroError(`Invalid type ${type} provided`);
      }

      statement.insertBefore(forLoop);

      replaceOrRemove(path, match);
    };
  }

  function createHandleMapFilterForEach(type) {
    return function handleMap(referencePath) {
      const path = referencePath.parentPath;

      if (!path.isCallExpression()) {
        return;
      }

      handleInvalidUsage({ handlers, path });
      handleArrowFunctionExpressionUse(path);

      const [collection, callback] = path.get('arguments');

      processNestedInlineLoopMacros(collection, handlers);

      const statement = path.getStatementParent();
      const local = getLocalReferences(path, statement);
      const localResults = getLocalName(path, 'results');
      const isForEach = type.includes('for-each');
      const result = path.scope.generateUidIdentifier('result');

      const { injectedBody, logic } = getInjectedBodyAndLogic({
        callback,
        isForEach,
        local,
        path,
        statement,
      });

      let forLoop;

      switch (type) {
        case 'map-left':
          forLoop = templates.map({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            RESULTS: localResults,
            VALUE: local.value,
          });
          break;

        case 'filter-left':
          forLoop = templates.filter({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            RESULT: result,
            RESULTS: localResults,
            VALUE: local.value,
          });
          break;

        case 'flat-map-left':
          forLoop = templates.flatMap({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            RESULT: result,
            RESULTS: localResults,
            VALUE: local.value,
          });
          break;

        case 'for-each-left':
          forLoop = templates.forEach({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LENGTH: local.length,
            VALUE: local.value,
          });
          break;

        case 'map-right':
          forLoop = templates.mapRight({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            RESULTS: localResults,
            VALUE: local.value,
          });
          break;

        case 'filter-right':
          forLoop = templates.filterRight({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LOGIC: logic,
            RESULT: result,
            RESULTS: localResults,
            VALUE: local.value,
          });
          break;

        case 'flat-map-right':
          forLoop = templates.flatMapRight({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LOGIC: logic,
            RESULT: result,
            RESULTS: localResults,
            VALUE: local.value,
          });
          break;

        case 'for-each-right':
          forLoop = templates.forEachRight({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            VALUE: local.value,
          });
          break;

        case 'map-object':
          forLoop = templates.mapObject({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LOGIC: logic,
            RESULT: result,
            RESULTS: localResults,
            VALUE: local.value,
          });
          break;

        case 'filter-object':
          forLoop = templates.filterObject({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LOGIC: logic,
            RESULT: result,
            RESULTS: localResults,
            VALUE: local.value,
          });
          break;

        case 'for-each-object':
          forLoop = templates.forEachObject({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            VALUE: local.value,
          });
          break;
      }

      statement.insertBefore(forLoop);

      replaceOrRemove(
        path,
        isForEach ? t.identifier('undefined') : localResults,
      );
    };
  }

  function createHandleReduce(type) {
    return function handleReduce(referencePath) {
      const path = referencePath.parentPath;

      if (!path.isCallExpression()) {
        return;
      }

      handleInvalidUsage({ handlers, path });
      handleArrowFunctionExpressionUse(path);

      const [collection, callback, initialValue] = path.get('arguments');

      processNestedInlineLoopMacros(collection, handlers);

      const statement = path.getStatementParent();
      const local = getLocalReferences(path, statement, true);

      const { injectedBody, logic } = getInjectedBodyAndLogic({
        callback,
        isReduce: true,
        local,
        path,
        statement,
      });

      let initial;

      if (type === 'right') {
        initial = initialValue
          ? initialValue.node
          : templates.nthLastItem({
              COLLECTION: local.collection,
              COUNT: t.numericLiteral(1),
            }).expression;
      } else {
        initial = initialValue
          ? initialValue.node
          : t.memberExpression(local.collection, t.numericLiteral(0), true);
      }

      const start = t.numericLiteral(initialValue ? 0 : 1);

      let forLoop;

      switch (type) {
        case 'left':
          forLoop = templates.reduce({
            ACCUMULATED: local.accumulated,
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            INITIAL: initial,
            LENGTH: local.length,
            LOGIC: logic,
            START: start,
            VALUE: local.value,
          });
          break;

        case 'right':
          forLoop = templates.reduceRight({
            ACCUMULATED: local.accumulated,
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            INITIAL: initial,
            LOGIC: logic,
            START: start,
            VALUE: local.value,
          });
          break;

        case 'object': {
          const skip = path.scope.generateUidIdentifier('skip');
          const shouldSkip = t.booleanLiteral(!initialValue);

          forLoop = templates.reduceObject({
            ACCUMULATED: local.accumulated,
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            INITIAL: initialValue ? initial : t.identifier('undefined'),
            LOGIC: logic,
            SKIP: skip,
            SHOULD_SKIP: shouldSkip,
            VALUE: local.value,
          });
          break;
        }
      }

      statement.insertBefore(forLoop);

      replaceOrRemove(path, local.accumulated);
    };
  }

  every.forEach(handlers.every);
  everyObject.forEach(handlers.everyObject);
  everyRight.forEach(handlers.everyRight);
  filter.forEach(handlers.filter);
  filterObject.forEach(handlers.filterObject);
  filterRight.forEach(handlers.filterRight);
  forEach.forEach(handlers.forEach);
  forEachObject.forEach(handlers.forEachObject);
  forEachRight.forEach(handlers.forEachRight);
  find.forEach(handlers.find);
  findObject.forEach(handlers.findObject);
  findLast.forEach(handlers.findLast);
  findIndex.forEach(handlers.findIndex);
  findKey.forEach(handlers.findKey);
  findLastIndex.forEach(handlers.findLastIndex);
  flatMap.forEach(handlers.flatMap);
  flatMapRight.forEach(handlers.flatMapRight);
  map.forEach(handlers.map);
  mapObject.forEach(handlers.mapObject);
  mapRight.forEach(handlers.mapRight);
  reduce.forEach(handlers.reduce);
  reduceObject.forEach(handlers.reduceObject);
  reduceRight.forEach(handlers.reduceRight);
  some.forEach(handlers.some);
  someObject.forEach(handlers.someObject);
  someRight.forEach(handlers.someRight);
}

module.exports = createMacro(myMacro);
