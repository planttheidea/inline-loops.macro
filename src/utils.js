const { MacroError } = require('babel-plugin-macros');

function getCachedFnArgs(local, isReduce) {
  return isReduce
    ? [local.accumulated, local.value, local.key, local.collection]
    : [local.value, local.key, local.collection];
}

function getImportedHandlerName(callee, handlers) {
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

function getLocalName(path, name = path.node.name) {
  return path.scope.generateUidIdentifier(name);
}

function handleArrowFunctionExpressionUse(path) {
  if (path.parentPath.isArrowFunctionExpression()) {
    path.parentPath.arrowFunctionToExpression({
      allowInsertArrow: false,
      noNewArrows: true,
    });
  }
}

function handleInvalidUsage({ handlers, path }) {
  const [collection, callback] = path.get('arguments');

  if (collection.isSpreadElement()) {
    throw new MacroError(
      'You cannot use spread arguments with `inline-loops.macro`; please declare the arguments explicitly.',
    );
  }

  const importedHandlerName = getImportedHandlerName(callback, handlers);

  if (importedHandlerName) {
    throw new MacroError(
      'You cannot use a method from `inline-loops.macro` directly as a handler; please wrap it in a function call.',
    );
  }
}

function processNestedInlineLoopMacros(path, handlers) {
  if (!path.isCallExpression()) {
    return;
  }

  const callee = path.get('callee');

  if (!callee.isIdentifier()) {
    return;
  }

  const importedHandlerName = getImportedHandlerName(callee, handlers);

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

module.exports = {
  getCachedFnArgs,
  getImportedHandlerName,
  getLocalName,
  handleArrowFunctionExpressionUse,
  handleInvalidUsage,
  processNestedInlineLoopMacros,
  rename,
  replaceOrRemove,
};
