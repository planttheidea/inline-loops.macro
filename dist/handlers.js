"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHandlers = createHandlers;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _babelPluginMacros = require("babel-plugin-macros");
var _templates = require("./templates");
var _traverse = require("./traverse");
var _utils = require("./utils");
function createHandlers(babel) {
  var t = babel.types;
  var templates = (0, _templates.createTemplates)(babel);
  var traverseConfigs = (0, _traverse.createTraverseConfigs)(babel);
  var handlers = {
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
    someRight: createHandleEverySome('some-right')
  };
  function getInjectedBodyAndLogic(_ref) {
    var handler = _ref.handler,
      isForEach = _ref.isForEach,
      isReduce = _ref.isReduce,
      local = _ref.local,
      path = _ref.path;
    var body = handler.get('body');
    var traverseState = {
      containsThis: false,
      count: 0,
      isForEach: isForEach,
      value: null
    };
    body.traverse(traverseConfigs.body, traverseState);
    var callbackContainsThis = traverseState.containsThis,
      returnCount = traverseState.count,
      returnValue = traverseState.value;
    if (body.isBlockStatement()) {
      if (!callbackContainsThis) {
        if (returnCount < 2) {
          body.traverse(traverseConfigs.stripReturn, {
            isForEach: isForEach
          });
        }
        if (returnCount === 0) {
          return {
            injectedBody: body.node.body,
            logic: t.identifier('undefined')
          };
        }
        if (returnCount === 1) {
          return {
            injectedBody: body.node.body,
            logic: returnValue
          };
        }
      }
      var localFnName = path.scope.generateUidIdentifier('fn');
      var localFn = templates.localVariable({
        LOCAL: localFnName,
        VALUE: handler.node
      });
      local.contents.push(localFn);
      var _logic = t.callExpression(localFnName, (0, _utils.getCachedFnArgs)(local, isReduce));
      return {
        injectedBody: [],
        logic: _logic
      };
    }
    if (handler.isFunction()) {
      return isForEach ? {
        injectedBody: body.node,
        logic: undefined
      } : {
        injectedBody: [],
        logic: body.node
      };
    }
    if (isForEach) {
      var injectedBody = [t.expressionStatement(t.callExpression(handler.node, (0, _utils.getCachedFnArgs)(local, isReduce)))];
      return {
        injectedBody: injectedBody,
        logic: undefined
      };
    }
    var logic = t.callExpression(handler.node, (0, _utils.getCachedFnArgs)(local, isReduce));
    return {
      injectedBody: [],
      logic: logic
    };
  }
  function getLocalReferences(path, isReduce) {
    var _path$get = path.get('arguments'),
      _path$get2 = (0, _slicedToArray2["default"])(_path$get, 2),
      collection = _path$get2[0],
      handler = _path$get2[1];
    if (!collection || !handler) {
      throw new _babelPluginMacros.MacroError('Must pass both a collection and a handler');
    }
    var contents = [];
    var localCollection = collection.node;
    if (!collection.isIdentifier()) {
      localCollection = (0, _utils.getLocalName)(path, 'collection');
      var localVariable = templates.localVariable({
        LOCAL: localCollection,
        VALUE: collection.node
      });
      contents.push(localVariable);
    }
    var accumulated;
    var value;
    var key;
    var scopedCollection;
    var localDestructuredRefName;
    if (handler.isFunction()) {
      if (isReduce) {
        var _ref2 = handler.get('params');
        var _ref3 = (0, _slicedToArray2["default"])(_ref2, 4);
        accumulated = _ref3[0];
        value = _ref3[1];
        key = _ref3[2];
        scopedCollection = _ref3[3];
      } else {
        var _ref4 = handler.get('params');
        var _ref5 = (0, _slicedToArray2["default"])(_ref4, 3);
        value = _ref5[0];
        key = _ref5[1];
        scopedCollection = _ref5[2];
      }
      if (value && (value.isArrayPattern() || value.isObjectPattern())) {
        localDestructuredRefName = path.scope.generateUidIdentifier('destructured');
        var _localVariable = templates.localVariable({
          LOCAL: value.node,
          VALUE: localDestructuredRefName
        });
        var body = handler.get('body');
        if (!body.isBlockStatement()) {
          body.replaceWith(t.blockStatement([t.returnStatement(body.node)]));
        }
        body.unshiftContainer('body', _localVariable);
        value.replaceWith(localDestructuredRefName);
      }
    }
    var localAccumulated = accumulated ? (0, _utils.getLocalName)(accumulated) : (0, _utils.getLocalName)(path, 'accumulated');
    var localKey = key ? (0, _utils.getLocalName)(key) : (0, _utils.getLocalName)(path, 'key');
    var localLength = (0, _utils.getLocalName)(path, 'length');
    var localValue;
    if (localDestructuredRefName) {
      localValue = localDestructuredRefName;
    } else {
      localValue = value ? (0, _utils.getLocalName)(value) : (0, _utils.getLocalName)(path, 'value');
    }
    if (accumulated) {
      (0, _utils.rename)(accumulated, localAccumulated.name);
    }
    if (value) {
      (0, _utils.rename)(value, localValue.name);
    }
    if (key) {
      (0, _utils.rename)(key, localKey.name);
    }
    if (scopedCollection) {
      (0, _utils.rename)(scopedCollection, localCollection.name);
    }
    return {
      accumulated: localAccumulated,
      collection: localCollection,
      contents: contents,
      key: localKey,
      length: localLength,
      value: localValue
    };
  }
  function createHandleEverySome(type) {
    return function handleFilter(referencePath) {
      var path = referencePath.parentPath;
      if (!(path !== null && path !== void 0 && path.isCallExpression())) {
        return;
      }
      (0, _utils.handleInvalidUsage)(path, handlers);
      (0, _utils.handleArrowFunctionExpressionUse)(path);
      var _path$get3 = path.get('arguments'),
        _path$get4 = (0, _slicedToArray2["default"])(_path$get3, 2),
        collection = _path$get4[0],
        handler = _path$get4[1];
      if (!collection || !handler) {
        throw new _babelPluginMacros.MacroError('Must pass both a collection and a handler');
      }
      (0, _utils.processNestedInlineLoopMacros)(collection, handlers);
      var local = getLocalReferences(path);
      var _getInjectedBodyAndLo = getInjectedBodyAndLogic({
          handler: handler,
          local: local,
          path: path
        }),
        injectedBody = _getInjectedBodyAndLo.injectedBody,
        logic = _getInjectedBodyAndLo.logic;
      var result = path.scope.generateUidIdentifier('result');
      var determination = path.scope.generateUidIdentifier('determination');
      var loop;
      switch (type) {
        case 'every-left':
          loop = templates.every({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            DETERMINATION: determination,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            VALUE: local.value
          });
          break;
        case 'some-left':
          loop = templates.some({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            DETERMINATION: determination,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            VALUE: local.value
          });
          break;
        case 'every-right':
          loop = templates.everyRight({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            DETERMINATION: determination,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value
          });
          break;
        case 'some-right':
          loop = templates.someRight({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            DETERMINATION: determination,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value
          });
          break;
        case 'every-object':
          loop = templates.everyObject({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            DETERMINATION: determination,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value
          });
          break;
        case 'some-object':
          loop = templates.someObject({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            DETERMINATION: determination,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value
          });
          break;
        default:
          throw new _babelPluginMacros.MacroError("Invalid type ".concat(type, " provided"));
      }
      local.contents.push(loop);
      (0, _utils.replaceOrRemove)(babel, path, local, templates, determination);
    };
  }
  function createHandleFind(type) {
    return function handleFilter(referencePath) {
      var path = referencePath.parentPath;
      if (!(path !== null && path !== void 0 && path.isCallExpression())) {
        return;
      }
      (0, _utils.handleInvalidUsage)(path, handlers);
      (0, _utils.handleArrowFunctionExpressionUse)(path);
      var _path$get5 = path.get('arguments'),
        _path$get6 = (0, _slicedToArray2["default"])(_path$get5, 2),
        collection = _path$get6[0],
        handler = _path$get6[1];
      if (!collection || !handler) {
        throw new _babelPluginMacros.MacroError('Must pass both a collection and a handler');
      }
      (0, _utils.processNestedInlineLoopMacros)(collection, handlers);
      var local = getLocalReferences(path);
      var _getInjectedBodyAndLo2 = getInjectedBodyAndLogic({
          handler: handler,
          local: local,
          path: path
        }),
        injectedBody = _getInjectedBodyAndLo2.injectedBody,
        logic = _getInjectedBodyAndLo2.logic;
      var result = path.scope.generateUidIdentifier('result');
      var match = path.scope.generateUidIdentifier('match');
      var loop;
      switch (type) {
        case 'find-left':
          loop = templates.find({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            MATCH: match,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            VALUE: local.value
          });
          break;
        case 'find-index':
          loop = templates.findIndex({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            MATCH: match,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            VALUE: local.value
          });
          break;
        case 'find-last':
          loop = templates.findLast({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            MATCH: match,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value
          });
          break;
        case 'find-last-index':
          loop = templates.findLastIndex({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            MATCH: match,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value
          });
          break;
        case 'find-object':
          loop = templates.findObject({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            MATCH: match,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value
          });
          break;
        case 'find-key':
          loop = templates.findKey({
            BODY: injectedBody,
            RESULT: result,
            COLLECTION: local.collection,
            MATCH: match,
            KEY: local.key,
            LOGIC: logic,
            VALUE: local.value
          });
          break;
        default:
          throw new _babelPluginMacros.MacroError("Invalid type ".concat(type, " provided"));
      }
      local.contents.push(loop);
      (0, _utils.replaceOrRemove)(babel, path, local, templates, match);
    };
  }
  function createHandleMapFilterForEach(type) {
    return function handleMap(referencePath) {
      var path = referencePath.parentPath;
      if (!(path !== null && path !== void 0 && path.isCallExpression())) {
        return;
      }
      (0, _utils.handleInvalidUsage)(path, handlers);
      (0, _utils.handleArrowFunctionExpressionUse)(path);
      var _path$get7 = path.get('arguments'),
        _path$get8 = (0, _slicedToArray2["default"])(_path$get7, 2),
        collection = _path$get8[0],
        handler = _path$get8[1];
      if (!collection || !handler) {
        throw new _babelPluginMacros.MacroError('Must pass both a collection and a handler');
      }
      (0, _utils.processNestedInlineLoopMacros)(collection, handlers);
      var local = getLocalReferences(path);
      var localResults = (0, _utils.getLocalName)(path, 'results');
      var isForEach = type.includes('for-each');
      var result = path.scope.generateUidIdentifier('result');
      var _getInjectedBodyAndLo3 = getInjectedBodyAndLogic({
          handler: handler,
          isForEach: isForEach,
          local: local,
          path: path
        }),
        injectedBody = _getInjectedBodyAndLo3.injectedBody,
        logic = _getInjectedBodyAndLo3.logic;
      var loop;
      switch (type) {
        case 'map-left':
          loop = templates.map({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            RESULTS: localResults,
            VALUE: local.value
          });
          break;
        case 'filter-left':
          loop = templates.filter({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            RESULT: result,
            RESULTS: localResults,
            VALUE: local.value
          });
          break;
        case 'flat-map-left':
          loop = templates.flatMap({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            RESULT: result,
            RESULTS: localResults,
            VALUE: local.value
          });
          break;
        case 'for-each-left':
          loop = templates.forEach({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LENGTH: local.length,
            VALUE: local.value
          });
          break;
        case 'map-right':
          loop = templates.mapRight({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LENGTH: local.length,
            LOGIC: logic,
            RESULTS: localResults,
            VALUE: local.value
          });
          break;
        case 'filter-right':
          loop = templates.filterRight({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LOGIC: logic,
            RESULT: result,
            RESULTS: localResults,
            VALUE: local.value
          });
          break;
        case 'flat-map-right':
          loop = templates.flatMapRight({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LOGIC: logic,
            RESULT: result,
            RESULTS: localResults,
            VALUE: local.value
          });
          break;
        case 'for-each-right':
          loop = templates.forEachRight({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            VALUE: local.value
          });
          break;
        case 'map-object':
          loop = templates.mapObject({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LOGIC: logic,
            RESULT: result,
            RESULTS: localResults,
            VALUE: local.value
          });
          break;
        case 'filter-object':
          loop = templates.filterObject({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LOGIC: logic,
            RESULT: result,
            RESULTS: localResults,
            VALUE: local.value
          });
          break;
        case 'for-each-object':
          loop = templates.forEachObject({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            VALUE: local.value
          });
          break;
        default:
          throw new _babelPluginMacros.MacroError("Invalid type ".concat(type, " provided"));
      }
      local.contents.push(loop);
      (0, _utils.replaceOrRemove)(babel, path, local, templates, isForEach ? t.identifier('undefined') : localResults);
    };
  }
  function createHandleReduce(type) {
    return function handleReduce(referencePath) {
      var path = referencePath.parentPath;
      if (!(path !== null && path !== void 0 && path.isCallExpression())) {
        return;
      }
      (0, _utils.handleInvalidUsage)(path, handlers);
      (0, _utils.handleArrowFunctionExpressionUse)(path);
      var _path$get9 = path.get('arguments'),
        _path$get10 = (0, _slicedToArray2["default"])(_path$get9, 3),
        collection = _path$get10[0],
        handler = _path$get10[1],
        initialValue = _path$get10[2];
      if (!collection || !handler) {
        throw new _babelPluginMacros.MacroError('Must pass both a collection and a handler');
      }
      (0, _utils.processNestedInlineLoopMacros)(collection, handlers);
      var local = getLocalReferences(path, true);
      var _getInjectedBodyAndLo4 = getInjectedBodyAndLogic({
          handler: handler,
          isReduce: true,
          local: local,
          path: path
        }),
        injectedBody = _getInjectedBodyAndLo4.injectedBody,
        logic = _getInjectedBodyAndLo4.logic;
      var initial;
      if (type === 'right') {
        initial = initialValue ? initialValue.node : templates.nthLastItem({
          COLLECTION: local.collection,
          COUNT: t.numericLiteral(1)
        }).expression;
      } else {
        initial = initialValue ? initialValue.node : t.memberExpression(local.collection, t.numericLiteral(0), true);
      }
      var start = t.numericLiteral(initialValue ? 0 : 1);
      var loop;
      switch (type) {
        case 'left':
          loop = templates.reduce({
            ACCUMULATED: local.accumulated,
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            INITIAL: initial,
            LENGTH: local.length,
            LOGIC: logic,
            START: start,
            VALUE: local.value
          });
          break;
        case 'right':
          loop = templates.reduceRight({
            ACCUMULATED: local.accumulated,
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            INITIAL: initial,
            LOGIC: logic,
            START: start,
            VALUE: local.value
          });
          break;
        case 'object':
          {
            var skip = path.scope.generateUidIdentifier('skip');
            var shouldSkip = t.booleanLiteral(!initialValue);
            loop = templates.reduceObject({
              ACCUMULATED: local.accumulated,
              BODY: injectedBody,
              COLLECTION: local.collection,
              KEY: local.key,
              INITIAL: initialValue ? initial : t.identifier('undefined'),
              LOGIC: logic,
              SKIP: skip,
              SHOULD_SKIP: shouldSkip,
              VALUE: local.value
            });
            break;
          }
        default:
          throw new _babelPluginMacros.MacroError("Invalid type ".concat(type, " provided"));
      }
      local.contents.push(loop);
      (0, _utils.replaceOrRemove)(babel, path, local, templates, local.accumulated);
    };
  }
  return handlers;
}