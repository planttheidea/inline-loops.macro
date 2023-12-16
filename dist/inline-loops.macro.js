"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28;
var _require = require('babel-plugin-macros'),
  MacroError = _require.MacroError,
  createMacro = _require.createMacro;
function myMacro(_ref) {
  var references = _ref.references,
    babel = _ref.babel;
  var template = babel.template,
    t = babel.types;
  var _references$every = references.every,
    every = _references$every === void 0 ? [] : _references$every,
    _references$everyObje = references.everyObject,
    everyObject = _references$everyObje === void 0 ? [] : _references$everyObje,
    _references$everyRigh = references.everyRight,
    everyRight = _references$everyRigh === void 0 ? [] : _references$everyRigh,
    _references$filter = references.filter,
    filter = _references$filter === void 0 ? [] : _references$filter,
    _references$filterObj = references.filterObject,
    filterObject = _references$filterObj === void 0 ? [] : _references$filterObj,
    _references$filterRig = references.filterRight,
    filterRight = _references$filterRig === void 0 ? [] : _references$filterRig,
    _references$find = references.find,
    find = _references$find === void 0 ? [] : _references$find,
    _references$findObjec = references.findObject,
    findObject = _references$findObjec === void 0 ? [] : _references$findObjec,
    _references$findLast = references.findLast,
    findLast = _references$findLast === void 0 ? [] : _references$findLast,
    _references$findIndex = references.findIndex,
    findIndex = _references$findIndex === void 0 ? [] : _references$findIndex,
    _references$findKey = references.findKey,
    findKey = _references$findKey === void 0 ? [] : _references$findKey,
    _references$findLastI = references.findLastIndex,
    findLastIndex = _references$findLastI === void 0 ? [] : _references$findLastI,
    _references$flatMap = references.flatMap,
    flatMap = _references$flatMap === void 0 ? [] : _references$flatMap,
    _references$flatMapRi = references.flatMapRight,
    flatMapRight = _references$flatMapRi === void 0 ? [] : _references$flatMapRi,
    _references$forEach = references.forEach,
    forEach = _references$forEach === void 0 ? [] : _references$forEach,
    _references$forEachOb = references.forEachObject,
    forEachObject = _references$forEachOb === void 0 ? [] : _references$forEachOb,
    _references$forEachRi = references.forEachRight,
    forEachRight = _references$forEachRi === void 0 ? [] : _references$forEachRi,
    _references$map = references.map,
    map = _references$map === void 0 ? [] : _references$map,
    _references$mapObject = references.mapObject,
    mapObject = _references$mapObject === void 0 ? [] : _references$mapObject,
    _references$mapRight = references.mapRight,
    mapRight = _references$mapRight === void 0 ? [] : _references$mapRight,
    _references$reduce = references.reduce,
    reduce = _references$reduce === void 0 ? [] : _references$reduce,
    _references$reduceObj = references.reduceObject,
    reduceObject = _references$reduceObj === void 0 ? [] : _references$reduceObj,
    _references$reduceRig = references.reduceRight,
    reduceRight = _references$reduceRig === void 0 ? [] : _references$reduceRig,
    _references$some = references.some,
    some = _references$some === void 0 ? [] : _references$some,
    _references$someObjec = references.someObject,
    someObject = _references$someObjec === void 0 ? [] : _references$someObjec,
    _references$someRight = references.someRight,
    someRight = _references$someRight === void 0 ? [] : _references$someRight;
  var nthLastItemTemplate = template(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n\tCOLLECTION[COLLECTION.length - COUNT]\n"])));
  var localVariableTemplate = template(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2["default"])(["\n\tconst LOCAL = VALUE;\n"])));
  var everyTemplate = template(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2["default"])(["\n    let DETERMINATION = true;\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (!RESULT) {\n        DETERMINATION = false;\n        break;\n      }\n    }\n"])));
  var everyObjectTemplate = template(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2["default"])(["\n    let DETERMINATION = true,\n        VALUE,\n        RESULT;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (!RESULT) {\n        DETERMINATION = false;\n        break;\n      }\n\t}\n"])));
  var everyRightTemplate = template(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2["default"])(["\n    let DETERMINATION = true;\n    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (!RESULT) {\n        DETERMINATION = false;\n        break;\n      }\n    }\n"])));
  var filterTemplate = template(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2["default"])(["\n    const RESULTS = [];\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        RESULTS.push(VALUE);\n      }\n    }\n"])));
  var filterObjectTemplate = template(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2["default"])(["\n    const RESULTS = {};\n    let RESULT,\n        VALUE;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        RESULTS[KEY] = VALUE;\n      }\n    }\n"])));
  var filterRightTemplate = template(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2["default"])(["\n    const RESULTS = [];\n    let RESULT,\n        VALUE;\n    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        RESULTS.push(VALUE);\n      }\n    }\n"])));
  var findTemplate = template(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2["default"])(["\n    let MATCH;\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        MATCH = VALUE;\n        break;\n      }\n    }\n"])));
  var findObjectTemplate = template(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2["default"])(["\n    let MATCH,\n        VALUE,\n        RESULT;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        MATCH = VALUE;\n        break;\n      }\n    }\n"])));
  var findRightTemplate = template(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2["default"])(["\n    let MATCH;\n    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        MATCH = VALUE;\n        break;\n      }\n    }\n"])));
  var findIndexTemplate = template(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2["default"])(["\n    let MATCH = -1;\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        MATCH = KEY;\n        break;\n      }\n    }\n"])));
  var findKeyTemplate = template(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2["default"])(["\n    let MATCH = -1,\n        VALUE,\n        RESULT;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        MATCH = KEY;\n        break;\n      }\n    }\n"])));
  var findIndexRightTemplate = template(_templateObject14 || (_templateObject14 = (0, _taggedTemplateLiteral2["default"])(["\n    let MATCH = -1;\n    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        MATCH = KEY;\n        break;\n      }\n    }\n"])));
  var flatMapTemplate = template(_templateObject15 || (_templateObject15 = (0, _taggedTemplateLiteral2["default"])(["\n    let RESULTS = [];\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n      RESULTS = RESULTS.concat(RESULT);\n    }\n"])));
  var flatMapRightTemplate = template(_templateObject16 || (_templateObject16 = (0, _taggedTemplateLiteral2["default"])(["\n    let RESULTS = [];\n    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n      RESULTS = RESULTS.concat(RESULT);\n    }\n"])));
  var forEachTemplate = template(_templateObject17 || (_templateObject17 = (0, _taggedTemplateLiteral2["default"])(["\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n    }\n"])));
  var forEachObjectTemplate = template(_templateObject18 || (_templateObject18 = (0, _taggedTemplateLiteral2["default"])(["\n    let VALUE;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n    }\n"])));
  var forEachRightTemplate = template(_templateObject19 || (_templateObject19 = (0, _taggedTemplateLiteral2["default"])([" \n    for (let KEY = COLLECTION.length, VALUE; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n    }\n"])));
  var mapTemplate = template(_templateObject20 || (_templateObject20 = (0, _taggedTemplateLiteral2["default"])(["\n    const LENGTH = COLLECTION.length;\n    const RESULTS = Array(LENGTH);\n\tfor (let KEY = 0, VALUE; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULTS[KEY] = LOGIC;\n    }\n"])));
  var mapObjectTemplate = template(_templateObject21 || (_templateObject21 = (0, _taggedTemplateLiteral2["default"])(["\n    const RESULTS = {};\n    let VALUE,\n        RESULT;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULTS[KEY] = LOGIC;\n    }\n"])));
  var mapRightTemplate = template(_templateObject22 || (_templateObject22 = (0, _taggedTemplateLiteral2["default"])(["\n    const LENGTH = COLLECTION.length;\n    let KEY = LENGTH;\n    const RESULTS = Array(LENGTH);\n    for (let VALUE; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULTS[LENGTH - KEY - 1] = LOGIC;\n    }\n"])));
  var reduceTemplate = template(_templateObject23 || (_templateObject23 = (0, _taggedTemplateLiteral2["default"])(["\n    let ACCUMULATED = INITIAL;\n    for (let KEY = START, LENGTH = COLLECTION.length, VALUE; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      ACCUMULATED = LOGIC;\n    }\n"])));
  var reduceObjectTemplate = template(_templateObject24 || (_templateObject24 = (0, _taggedTemplateLiteral2["default"])(["\n    let SKIP = SHOULD_SKIP,\n        ACCUMULATED = INITIAL,\n        VALUE;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n\n      if (SKIP) {\n        ACCUMULATED = VALUE;\n        SKIP = false;\n        continue;\n      }\n\n      BODY\n      ACCUMULATED = LOGIC;\n    }\n"])));
  var reduceRightTemplate = template(_templateObject25 || (_templateObject25 = (0, _taggedTemplateLiteral2["default"])(["\n    let ACCUMULATED = INITIAL;\n    for (let KEY = COLLECTION.length - START, VALUE; --KEY >= START;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      ACCUMULATED = LOGIC;\n    }\n"])));
  var someTemplate = template(_templateObject26 || (_templateObject26 = (0, _taggedTemplateLiteral2["default"])(["\n    let DETERMINATION = false;\n    for (let KEY = 0, LENGTH = COLLECTION.length, VALUE, RESULT; KEY < LENGTH; ++KEY) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        DETERMINATION = true;\n        break;\n      }\n    }\n"])));
  var someObjectTemplate = template(_templateObject27 || (_templateObject27 = (0, _taggedTemplateLiteral2["default"])(["\n    let DETERMINATION = false,\n        VALUE,\n        RESULT;\n    for (const KEY in COLLECTION) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        DETERMINATION = true;\n        break;\n      }\n    }\n"])));
  var someRightTemplate = template(_templateObject28 || (_templateObject28 = (0, _taggedTemplateLiteral2["default"])(["\n    const DETERMINATION = false;\n    for (let KEY = COLLECTION.length, VALUE, RESULT; --KEY >= 0;) {\n      VALUE = COLLECTION[KEY];\n      BODY\n      RESULT = LOGIC;\n\n      if (RESULT) {\n        DETERMINATION = true;\n        break;\n      }\n    }\n"])));
  var stripReturnTraverseConfig = {
    ReturnStatement: function ReturnStatement(returnPath) {
      var returnState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var arg = returnPath.get('argument');
      if (returnState.isForEach) {
        if (arg.node) {
          var statement = arg.isExpression() ? t.expressionStatement(arg.node) : arg.node;
          returnPath.insertBefore(statement);
        }
        returnPath.replaceWith(t.continueStatement());
      } else {
        returnPath.remove();
      }
    }
  };
  var bodyTraverseConfig = {
    ArrayPattern: function ArrayPattern(arrayPatternPath) {
      arrayPatternPath.get('elements').forEach(function (element) {
        if (element.isIdentifier()) {
          rename(element);
        }
      });
    },
    ObjectPattern: function ObjectPattern(objectPatternPath) {
      objectPatternPath.get('properties').forEach(function (property) {
        var value = property.get('value');
        if (value.isIdentifier()) {
          rename(value);
        }
      });
    },
    ReturnStatement: function ReturnStatement(returnPath, returnState) {
      var statementParent = returnPath.parentPath.getStatementParent();
      if (statementParent.isIfStatement() || statementParent.isSwitchStatement()) {
        // If conditional returns exist, bail out inlining return statement.
        returnState.value = null;
        returnState.count = Infinity;
        return;
      }
      returnState.value = returnState.count ? null : returnPath.get('argument').node;
      returnState.count++;
    },
    ThisExpression: function ThisExpression(thisPath, thisState) {
      thisState.containsThis = true;
    },
    VariableDeclarator: function VariableDeclarator(variablePath) {
      var id = variablePath.get('id');
      rename(id);
    }
  };
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
  function getImportedHandlerName(callee) {
    var binding = callee.scope.getBinding(callee.node.name);
    if (!binding) {
      return;
    }
    var owner = binding.path;
    if (owner.isImportSpecifier()) {
      var imported = owner.get('imported');
      var name = imported.node.name;
      if (!Object.keys(handlers).some(function (handler) {
        return handler === name;
      })) {
        return;
      }
      var importSource = owner.parentPath.get('source.value');
      if (!importSource.node.endsWith('inline-loops.macro')) {
        return;
      }
      return name;
    }
    if (owner.isVariableDeclarator()) {
      var init = owner.get('init');
      if (!init.isCallExpression() || !init.get('callee').isIdentifier({
        name: 'require'
      })) {
        return;
      }
      var requireSource = init.get('arguments.0.value');
      if (!requireSource.node.endsWith('inline-loops.macro')) {
        return;
      }
      var _imported = owner.get('id.properties').find(function (property) {
        return property.get('value').isIdentifier({
          name: callee.node.name
        });
      });
      if (!_imported) {
        return;
      }
      var _name = _imported.get('key').node.name;
      if (!Object.keys(handlers).some(function (handler) {
        return handler === _name;
      })) {
        return;
      }
      return _name;
    }
  }
  function getInjectedBodyAndLogic(_ref2) {
    var callback = _ref2.callback,
      isForEach = _ref2.isForEach,
      isReduce = _ref2.isReduce,
      local = _ref2.local,
      path = _ref2.path,
      statement = _ref2.statement;
    var body = callback.get('body');
    var traverseState = {
      containsThis: false,
      count: 0,
      isForEach: isForEach,
      value: null
    };
    body.traverse(bodyTraverseConfig, traverseState);
    var callbackContainsThis = traverseState.containsThis,
      returnCount = traverseState.count,
      returnValue = traverseState.value;
    if (body.isBlockStatement()) {
      if (!callbackContainsThis) {
        if (returnCount < 2) {
          body.traverse(stripReturnTraverseConfig, {
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
      var localFn = localVariableTemplate({
        LOCAL: localFnName,
        VALUE: callback.node
      });
      statement.insertBefore(localFn);
      var _logic = t.callExpression(localFnName, getCachedFnArgs(local, isReduce));
      return {
        injectedBody: [],
        logic: _logic
      };
    }
    if (callback.isFunction()) {
      return isForEach ? {
        injectedBody: body.node,
        logic: undefined
      } : {
        injectedBody: [],
        logic: body.node
      };
    }
    if (isForEach) {
      var injectedBody = [t.expressionStatement(t.callExpression(callback.node, getCachedFnArgs(local, isReduce)))];
      return {
        injectedBody: injectedBody,
        logic: undefined
      };
    }
    var logic = t.callExpression(callback.node, getCachedFnArgs(local, isReduce));
    return {
      injectedBody: [],
      logic: logic
    };
  }
  function getCachedFnArgs(local, isReduce) {
    return isReduce ? [local.accumulated, local.value, local.key, local.collection] : [local.value, local.key, local.collection];
  }
  function getLocalName(path) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : path.node.name;
    return path.scope.generateUidIdentifier(name);
  }
  function getLocalReferences(path, statement, isReduce) {
    var args = path.get('arguments');
    var _args = (0, _slicedToArray2["default"])(args, 2),
      collection = _args[0],
      callback = _args[1];
    var localCollection = collection.node;
    if (!collection.isIdentifier()) {
      localCollection = getLocalName(path, 'collection');
      var localVariable = localVariableTemplate({
        LOCAL: localCollection,
        VALUE: collection.node
      });
      statement.insertBefore(localVariable);
    }
    var accumulated;
    var value;
    var key;
    var scopedCollection;
    var localDestructuredRefName;
    if (callback.isFunction()) {
      if (isReduce) {
        var _callback$get = callback.get('params');
        var _callback$get2 = (0, _slicedToArray2["default"])(_callback$get, 4);
        accumulated = _callback$get2[0];
        value = _callback$get2[1];
        key = _callback$get2[2];
        scopedCollection = _callback$get2[3];
      } else {
        var _callback$get3 = callback.get('params');
        var _callback$get4 = (0, _slicedToArray2["default"])(_callback$get3, 3);
        value = _callback$get4[0];
        key = _callback$get4[1];
        scopedCollection = _callback$get4[2];
      }
      if (value && (value.isArrayPattern() || value.isObjectPattern())) {
        localDestructuredRefName = path.scope.generateUidIdentifier('destructured');
        var _localVariable = localVariableTemplate({
          LOCAL: value.node,
          VALUE: localDestructuredRefName
        });
        var body = callback.get('body');
        if (!body.isBlockStatement()) {
          body.replaceWith(t.blockStatement([t.returnStatement(body.node)]));
        }
        body.unshiftContainer('body', _localVariable);
        value.replaceWith(localDestructuredRefName);
      }
    }
    var localAccumulated = accumulated ? getLocalName(accumulated) : getLocalName(path, 'accumulated');
    var localKey = key ? getLocalName(key) : getLocalName(path, 'key');
    var localLength = getLocalName(path, 'length');
    var localValue;
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
      value: localValue
    };
  }
  function handleArrowFunctionExpressionUse(path) {
    if (path.parentPath.isArrowFunctionExpression()) {
      path.parentPath.arrowFunctionToExpression({
        allowInsertArrow: false,
        noNewArrows: true
      });
    }
  }
  function handleInvalidUsage(path) {
    var _path$get = path.get('arguments'),
      _path$get2 = (0, _slicedToArray2["default"])(_path$get, 2),
      collection = _path$get2[0],
      callback = _path$get2[1];
    if (collection.isSpreadElement()) {
      throw new MacroError('You cannot use spread arguments with `inline-loops.macro`; please declare the arguments explicitly.');
    }
    var importedHandlerName = getImportedHandlerName(callback);
    if (importedHandlerName) {
      throw new MacroError('You cannot use a method from `inline-loops.macro` directly as a handler; please wrap it in a function call.');
    }
  }
  function processNestedInlineLoopMacros(path) {
    if (!path.isCallExpression()) {
      return;
    }
    var callee = path.get('callee');
    if (!callee.isIdentifier()) {
      return;
    }
    var importedHandlerName = getImportedHandlerName(callee);
    if (importedHandlerName) {
      handlers[importedHandlerName](path.get('callee'));
    }
  }
  function rename(path, newName) {
    path.scope.rename(path.node.name, newName);
  }
  function replaceOrRemove(path, replacement) {
    var parentPath = path.parentPath;
    if (parentPath.isExpressionStatement()) {
      path.remove();
    } else {
      path.replaceWith(replacement);
    }
  }
  function createHandleEverySome(type) {
    return function handleFilter(referencePath) {
      var path = referencePath.parentPath;
      if (!path.isCallExpression()) {
        return;
      }
      handleInvalidUsage(path);
      handleArrowFunctionExpressionUse(path);
      var _path$get3 = path.get('arguments'),
        _path$get4 = (0, _slicedToArray2["default"])(_path$get3, 2),
        collection = _path$get4[0],
        callback = _path$get4[1];
      processNestedInlineLoopMacros(collection);
      var statement = path.getStatementParent();
      var local = getLocalReferences(path, statement);
      var _getInjectedBodyAndLo = getInjectedBodyAndLogic({
          callback: callback,
          local: local,
          path: path,
          statement: statement
        }),
        injectedBody = _getInjectedBodyAndLo.injectedBody,
        logic = _getInjectedBodyAndLo.logic;
      var result = path.scope.generateUidIdentifier('result');
      var determination = path.scope.generateUidIdentifier('determination');
      var forLoop;
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
            VALUE: local.value
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
            VALUE: local.value
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
            VALUE: local.value
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
            VALUE: local.value
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
            VALUE: local.value
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
            VALUE: local.value
          });
          break;
        default:
          throw new MacroError("Invalid type ".concat(type, " provided"));
      }
      statement.insertBefore(forLoop);
      replaceOrRemove(path, determination);
    };
  }
  function createHandleFind(type) {
    return function handleFilter(referencePath) {
      var path = referencePath.parentPath;
      if (!path.isCallExpression()) {
        return;
      }
      handleInvalidUsage(path);
      handleArrowFunctionExpressionUse(path);
      var _path$get5 = path.get('arguments'),
        _path$get6 = (0, _slicedToArray2["default"])(_path$get5, 2),
        collection = _path$get6[0],
        callback = _path$get6[1];
      processNestedInlineLoopMacros(collection);
      var statement = path.getStatementParent();
      var local = getLocalReferences(path, statement);
      var _getInjectedBodyAndLo2 = getInjectedBodyAndLogic({
          callback: callback,
          local: local,
          path: path,
          statement: statement
        }),
        injectedBody = _getInjectedBodyAndLo2.injectedBody,
        logic = _getInjectedBodyAndLo2.logic;
      var result = path.scope.generateUidIdentifier('result');
      var match = path.scope.generateUidIdentifier('match');
      var forLoop;
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
            VALUE: local.value
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
            VALUE: local.value
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
            VALUE: local.value
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
            VALUE: local.value
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
            VALUE: local.value
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
            VALUE: local.value
          });
          break;
        default:
          throw new MacroError("Invalid type ".concat(type, " provided"));
      }
      statement.insertBefore(forLoop);
      replaceOrRemove(path, match);
    };
  }
  function createHandleMapFilterForEach(type) {
    return function handleMap(referencePath) {
      var path = referencePath.parentPath;
      if (!path.isCallExpression()) {
        return;
      }
      handleInvalidUsage(path);
      handleArrowFunctionExpressionUse(path);
      var _path$get7 = path.get('arguments'),
        _path$get8 = (0, _slicedToArray2["default"])(_path$get7, 2),
        collection = _path$get8[0],
        callback = _path$get8[1];
      processNestedInlineLoopMacros(collection);
      var statement = path.getStatementParent();
      var local = getLocalReferences(path, statement);
      var localResults = getLocalName(path, 'results');
      var isForEach = type.includes('for-each');
      var result = path.scope.generateUidIdentifier('result');
      var _getInjectedBodyAndLo3 = getInjectedBodyAndLogic({
          callback: callback,
          isForEach: isForEach,
          local: local,
          path: path,
          statement: statement
        }),
        injectedBody = _getInjectedBodyAndLo3.injectedBody,
        logic = _getInjectedBodyAndLo3.logic;
      var forLoop;
      switch (type) {
        case 'map-left':
          forLoop = mapTemplate({
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
          forLoop = filterTemplate({
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
          forLoop = flatMapTemplate({
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
          forLoop = forEachTemplate({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            LENGTH: local.length,
            VALUE: local.value
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
            VALUE: local.value
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
            VALUE: local.value
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
            VALUE: local.value
          });
          break;
        case 'for-each-right':
          forLoop = forEachRightTemplate({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            VALUE: local.value
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
            VALUE: local.value
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
            VALUE: local.value
          });
          break;
        case 'for-each-object':
          forLoop = forEachObjectTemplate({
            BODY: injectedBody,
            COLLECTION: local.collection,
            KEY: local.key,
            VALUE: local.value
          });
          break;
      }
      statement.insertBefore(forLoop);
      replaceOrRemove(path, isForEach ? t.identifier('undefined') : localResults);
    };
  }
  function createHandleReduce(type) {
    return function handleReduce(referencePath) {
      var path = referencePath.parentPath;
      if (!path.isCallExpression()) {
        return;
      }
      handleInvalidUsage(path);
      handleArrowFunctionExpressionUse(path);
      var _path$get9 = path.get('arguments'),
        _path$get10 = (0, _slicedToArray2["default"])(_path$get9, 3),
        collection = _path$get10[0],
        callback = _path$get10[1],
        initialValue = _path$get10[2];
      processNestedInlineLoopMacros(collection);
      var statement = path.getStatementParent();
      var local = getLocalReferences(path, statement, true);
      var _getInjectedBodyAndLo4 = getInjectedBodyAndLogic({
          callback: callback,
          isReduce: true,
          local: local,
          path: path,
          statement: statement
        }),
        injectedBody = _getInjectedBodyAndLo4.injectedBody,
        logic = _getInjectedBodyAndLo4.logic;
      var initial;
      if (type === 'right') {
        initial = initialValue ? initialValue.node : nthLastItemTemplate({
          COLLECTION: local.collection,
          COUNT: t.numericLiteral(1)
        }).expression;
      } else {
        initial = initialValue ? initialValue.node : t.memberExpression(local.collection, t.numericLiteral(0), true);
      }
      var start = t.numericLiteral(initialValue ? 0 : 1);
      var forLoop;
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
            VALUE: local.value
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
            VALUE: local.value
          });
          break;
        case 'object':
          {
            var skip = path.scope.generateUidIdentifier('skip');
            var shouldSkip = t.booleanLiteral(!initialValue);
            forLoop = reduceObjectTemplate({
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