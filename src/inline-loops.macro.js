const { MacroError, createMacro } = require('babel-plugin-macros');

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

  const nthLastItemTemplate = template`
	COLLECTION[COLLECTION.length - COUNT]
`;

  const localVariableTemplate = template`
	const LOCAL = VALUE;
`;

  const everyTemplate = template`
    let DETERMINATION = true;
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (!RESULT) {
        DETERMINATION = false;
        break;
      }
    }
`;

  const everyObjectTemplate = template`
    let DETERMINATION = true,
        VALUE,
        RESULT;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (!RESULT) {
        DETERMINATION = false;
        break;
      }
	}
`;

  const everyRightTemplate = template`
    let DETERMINATION = true;
    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (!RESULT) {
        DETERMINATION = false;
        break;
      }
    }
`;

  const filterTemplate = template`
    const RESULTS = [];
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        RESULTS.push(VALUE);
      }
    }
`;

  const filterObjectTemplate = template`
    const RESULTS = {};
    let RESULT,
        VALUE;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        RESULTS[KEY] = VALUE;
      }
    }
`;

  const filterRightTemplate = template`
    const RESULTS = [];
    let RESULT,
        VALUE;
    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        RESULTS.push(VALUE);
      }
    }
`;

  const findTemplate = template`
    let MATCH;
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        MATCH = VALUE;
        break;
      }
    }
`;

  const findObjectTemplate = template`
    let MATCH,
        VALUE,
        RESULT;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        MATCH = VALUE;
        break;
      }
    }
`;

  const findRightTemplate = template`
    let MATCH;
    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        MATCH = VALUE;
        break;
      }
    }
`;

  const findIndexTemplate = template`
    let MATCH = -1;
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        MATCH = KEY;
        break;
      }
    }
`;

  const findKeyTemplate = template`
    let MATCH = -1,
        VALUE,
        RESULT;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        MATCH = KEY;
        break;
      }
    }
`;

  const findIndexRightTemplate = template`
    let MATCH = -1;
    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        MATCH = KEY;
        break;
      }
    }
`;

  const flatMapTemplate = template`
    let RESULTS = [];
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;
      RESULTS = RESULTS.concat(RESULT);
    }
`;

  const flatMapRightTemplate = template`
    let RESULTS = [];
    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;
      RESULTS = RESULTS.concat(RESULT);
    }
`;

  const forEachTemplate = template`
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
    }
`;

  const forEachObjectTemplate = template`
    let VALUE;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
    }
`;

  const forEachRightTemplate = template` 
    for (let KEY = COLLECTION.length, VALUE; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
    }
`;

  const mapTemplate = template`
    const LENGTH = COLLECTION.length;
    const RESULTS = Array(LENGTH);
	for (let KEY = 0, VALUE; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULTS[KEY] = LOGIC;
    }
`;

  const mapObjectTemplate = template`
    const RESULTS = {};
    let VALUE,
        RESULT;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULTS[KEY] = LOGIC;
    }
`;

  const mapRightTemplate = template`
    const LENGTH = COLLECTION.length;
    let KEY = LENGTH;
    const RESULTS = Array(LENGTH);
    for (let VALUE; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULTS[LENGTH - KEY - 1] = LOGIC;
    }
`;

  const reduceTemplate = template`
    let ACCUMULATED = INITIAL;
    for (let KEY = START, LENGTH = COLLECTION.length, VALUE; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      ACCUMULATED = LOGIC;
    }
`;

  const reduceObjectTemplate = template`
    let SKIP = SHOULD_SKIP,
        ACCUMULATED = INITIAL,
        VALUE;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];

      if (SKIP) {
        ACCUMULATED = VALUE;
        SKIP = false;
        continue;
      }

      BODY
      ACCUMULATED = LOGIC;
    }
`;

  const reduceRightTemplate = template`
    let ACCUMULATED = INITIAL;
    for (let KEY = COLLECTION.length - START, VALUE; --KEY >= START;) {
      VALUE = COLLECTION[KEY];
      BODY
      ACCUMULATED = LOGIC;
    }
`;

  const someTemplate = template`
    let DETERMINATION = false;
    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        DETERMINATION = true;
        break;
      }
    }
`;

  const someObjectTemplate = template`
    let DETERMINATION = false,
        VALUE,
        RESULT;
    for (const KEY in COLLECTION) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        DETERMINATION = true;
        break;
      }
    }
`;

  const someRightTemplate = template`
    const DETERMINATION = false;
    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {
      VALUE = COLLECTION[KEY];
      BODY
      RESULT = LOGIC;

      if (RESULT) {
        DETERMINATION = true;
        break;
      }
    }
`;

  const stripReturnTraverseConfig = {
    ReturnStatement(returnPath, returnState = {}) {
      const arg = returnPath.get('argument');

      if (returnState.isForEach) {
        if (arg.node) {
          const statement = arg.isExpression()
            ? t.expressionStatement(arg.node)
            : arg.node;

          returnPath.insertBefore(statement);
        }

        returnPath.replaceWith(t.continueStatement());
      } else {
        returnPath.remove();
      }
    },
  };

  const bodyTraverseConfig = {
    ArrayPattern(arrayPatternPath) {
      arrayPatternPath.get('elements').forEach((element) => {
        if (element.isIdentifier()) {
          rename(element);
        }
      });
    },
    ObjectPattern(objectPatternPath) {
      objectPatternPath.get('properties').forEach((property) => {
        const value = property.get('value');

        if (value.isIdentifier()) {
          rename(value);
        }
      });
    },
    ReturnStatement(returnPath, returnState) {
      const statementParent = returnPath.parentPath.getStatementParent();

      if (
        statementParent.isIfStatement() ||
        statementParent.isSwitchStatement()
      ) {
        // If conditional returns exist, bail out inlining return statement.
        returnState.value = null;
        returnState.count = Infinity;
        return;
      }

      returnState.value = returnState.count
        ? null
        : returnPath.get('argument').node;
      returnState.count++;
    },
    ThisExpression(thisPath, thisState) {
      thisState.containsThis = true;
    },
    VariableDeclarator(variablePath) {
      const id = variablePath.get('id');

      rename(id);
    },
  };

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

  function getImportedHandlerName(callee) {
    const binding = callee.scope.getBinding(callee.node.name);

    if (!binding) {
      return;
    }

    const owner = binding.path;

    if (owner.isImportSpecifier()) {
      const imported = owner.get('imported');
      const name = imported.node.name;

      if (!Object.keys(handlers).some((handler) => handler === name)) {
        return;
      }

      const importSource = owner.parentPath.get('source.value');

      if (!importSource.node.endsWith('inline-loops.macro')) {
        return;
      }

      return name;
    }

    if (owner.isVariableDeclarator()) {
      const init = owner.get('init');

      if (
        !init.isCallExpression() ||
        !init.get('callee').isIdentifier({ name: 'require' })
      ) {
        return;
      }

      const requireSource = init.get('arguments.0.value');

      if (!requireSource.node.endsWith('inline-loops.macro')) {
        return;
      }

      const imported = owner
        .get('id.properties')
        .find((property) =>
          property.get('value').isIdentifier({ name: callee.node.name }),
        );

      if (!imported) {
        return;
      }

      const name = imported.get('key').node.name;

      if (!Object.keys(handlers).some((handler) => handler === name)) {
        return;
      }

      return name;
    }
  }

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

    body.traverse(bodyTraverseConfig, traverseState);

    const {
      containsThis: callbackContainsThis,
      count: returnCount,
      value: returnValue,
    } = traverseState;

    if (body.isBlockStatement()) {
      if (!callbackContainsThis) {
        if (returnCount < 2) {
          body.traverse(stripReturnTraverseConfig, { isForEach });
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
      const localFn = localVariableTemplate({
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

  function getCachedFnArgs(local, isReduce) {
    return isReduce
      ? [local.accumulated, local.value, local.key, local.collection]
      : [local.value, local.key, local.collection];
  }

  function getLocalName(path, name = path.node.name) {
    return path.scope.generateUidIdentifier(name);
  }

  function getLocalReferences(path, statement, isReduce) {
    const args = path.get('arguments');

    const [collection, callback] = args;

    let localCollection = collection.node;

    if (!collection.isIdentifier()) {
      localCollection = getLocalName(path, 'collection');

      const localVariable = localVariableTemplate({
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

        const localVariable = localVariableTemplate({
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

  function handleInvalidUsage(path) {
    const [collection, callback] = path.get('arguments');

    if (collection.isSpreadElement()) {
      throw new MacroError(
        'You cannot use spread arguments with `inline-loops.macro`; please declare the arguments explicitly.',
      );
    }

    const importedHandlerName = getImportedHandlerName(callback);

    if (importedHandlerName) {
      throw new MacroError(
        'You cannot use a method from `inline-loops.macro` directly as a handler; please wrap it in a function call.',
      );
    }
  }

  function processNestedInlineLoopMacros(path) {
    if (!path.isCallExpression()) {
      return;
    }

    const callee = path.get('callee');

    if (!callee.isIdentifier()) {
      return;
    }

    const importedHandlerName = getImportedHandlerName(callee);

    if (importedHandlerName) {
      handlers[importedHandlerName](path.get('callee'));
    }
  }

  function rename(path, newName) {
    path.scope.rename(path.node.name, newName);
  }

  function replaceOrRemove(path, replacement) {
    const parentPath = path.parentPath;

    if (parentPath.isExpressionStatement()) {
      path.remove();
    } else {
      path.replaceWith(replacement);
    }
  }

  function createHandleEverySome(type) {
    return function handleFilter(referencePath) {
      const path = referencePath.parentPath;

      if (!path.isCallExpression()) {
        return;
      }

      handleInvalidUsage(path);

      const [collection, callback] = path.get('arguments');

      processNestedInlineLoopMacros(collection);

      const statement = path.getStatementParent();
      const local = getLocalReferences(path, statement);
      const localResults = getLocalName(path, 'results');

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
          forLoop = everyTemplate({
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
          forLoop = someTemplate({
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
          forLoop = everyRightTemplate({
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
          forLoop = someRightTemplate({
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
          forLoop = everyObjectTemplate({
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
          forLoop = someObjectTemplate({
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

      handleInvalidUsage(path);

      const [collection, callback] = path.get('arguments');

      processNestedInlineLoopMacros(collection);

      const statement = path.getStatementParent();
      const local = getLocalReferences(path, statement);
      const localResults = getLocalName(path, 'results');

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
          forLoop = findTemplate({
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
          forLoop = findIndexTemplate({
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
          forLoop = findRightTemplate({
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
          forLoop = findIndexRightTemplate({
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
          forLoop = findObjectTemplate({
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
          forLoop = findKeyTemplate({
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

      handleInvalidUsage(path);

      const [collection, callback] = path.get('arguments');

      processNestedInlineLoopMacros(collection);

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
          forLoop = mapTemplate({
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
          forLoop = filterTemplate({
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
          forLoop = flatMapTemplate({
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
          forLoop = forEachTemplate({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LENGTH: local.length,
            VALUE: local.value,
          });
          break;

        case 'map-right':
          forLoop = mapRightTemplate({
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
          forLoop = filterRightTemplate({
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
          forLoop = flatMapRightTemplate({
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
          forLoop = forEachRightTemplate({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            VALUE: local.value,
          });
          break;

        case 'map-object':
          forLoop = mapObjectTemplate({
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
          forLoop = filterObjectTemplate({
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
          forLoop = forEachObjectTemplate({
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

      handleInvalidUsage(path);

      const [collection, callback, initialValue] = path.get('arguments');

      processNestedInlineLoopMacros(collection);

      const statement = path.getStatementParent();
      const local = getLocalReferences(path, statement, true);
      const localResults = getLocalName(path, 'results');

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
          : nthLastItemTemplate({
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
          forLoop = reduceTemplate({
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
          forLoop = reduceRightTemplate({
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

        case 'object':
          const skip = path.scope.generateUidIdentifier('skip');
          const shouldSkip = t.booleanLiteral(!initialValue);

          forLoop = reduceObjectTemplate({
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
