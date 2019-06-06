const { createMacro, MacroError } = require('babel-plugin-macros');

const {
  handleEvery,
  handleFilter,
  handleFind,
  handleFindKey,
  handleForEach,
  handleMap,
  handleReduce,
  handleSome,
} = require('./handlers');

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
        throw new MacroError(`You cannot use ${name} in a conditional expression.`);
      }
      const args = path.parent.arguments;

      if (args.some(arg => t.isSpreadElement(arg))) {
        throw new MacroError(
          'You cannot use spread arguments with the macro, please declare the arguments explicitly.',
        );
      }

      const [object, handler, initialValue] = args;
      const isHandlerMacro = allMethods.find(
        ({ path: methodPath }) => methodPath.node !== path.node && handler === methodPath.node,
      );

      if (isHandlerMacro) {
        throw new MacroError(
          'You cannot use the macro directly as a handler, please wrap it in a function call.',
        );
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

    const handler = createTransformer(method, handlers[sourceMethod], isDecrementing, isObject);

    handler(path);
  });
}

module.exports = createMacro(inlineLoops);
