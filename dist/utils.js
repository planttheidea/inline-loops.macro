"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCachedFnArgs = getCachedFnArgs;
exports.getImportedHandlerName = getImportedHandlerName;
exports.getLocalName = getLocalName;
exports.handleArrowFunctionExpressionUse = handleArrowFunctionExpressionUse;
exports.handleInvalidUsage = handleInvalidUsage;
exports.isMacroHandlerName = isMacroHandlerName;
exports.processNestedInlineLoopMacros = processNestedInlineLoopMacros;
exports.rename = rename;
exports.replaceOrRemove = replaceOrRemove;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _babelPluginMacros = require("babel-plugin-macros");
function getCachedFnArgs(local, isReduce) {
  return isReduce ? [local.accumulated, local.value, local.key, local.collection] : [local.value, local.key, local.collection];
}
function getImportedHandlerName(callee, handlers) {
  var binding = callee.scope.getBinding(callee.node.name);
  if (!binding) {
    return;
  }
  var owner = binding.path;
  if (owner.isImportSpecifier()) {
    var imported = owner.get('imported');
    var name = imported.isIdentifier() ? imported.node.name : imported.node.value;
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
    if (!init || !init.isCallExpression() || !init.get('callee').isIdentifier({
      name: 'require'
    })) {
      return;
    }
    var requireSource = init.get('arguments.0.value');
    if (!requireSource.node.endsWith('inline-loops.macro')) {
      return;
    }
    var _imported = owner.get('id.properties').find(function (property) {
      var value = property.get('value');
      return value.isIdentifier({
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
function getLocalName(path) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : path.isIdentifier() ? path.node.name : undefined;
  return path.scope.generateUidIdentifier(name);
}
function handleArrowFunctionExpressionUse(path) {
  if (path.parentPath.isArrowFunctionExpression()) {
    path.parentPath.arrowFunctionToExpression({
      allowInsertArrow: false,
      noNewArrows: true
    });
  }
}
function handleInvalidUsage(path, handlers) {
  var _path$get = path.get('arguments'),
    _path$get2 = (0, _slicedToArray2["default"])(_path$get, 2),
    collection = _path$get2[0],
    handler = _path$get2[1];
  if (collection !== null && collection !== void 0 && collection.isSpreadElement()) {
    throw new _babelPluginMacros.MacroError('You cannot use spread arguments with `inline-loops.macro`; please declare the arguments explicitly.');
  }
  var importedHandlerName = getImportedHandlerName(handler, handlers);
  if (importedHandlerName) {
    throw new _babelPluginMacros.MacroError('You cannot use a method from `inline-loops.macro` directly as a handler; please wrap it in a export function call.');
  }
}
function isMacroHandlerName(handlers, name) {
  return !!(name && handlers[name]);
}
function processNestedInlineLoopMacros(path, handlers) {
  if (!path.isCallExpression()) {
    return;
  }
  var callee = path.get('callee');
  if (!callee.isIdentifier()) {
    return;
  }
  var importedHandlerName = getImportedHandlerName(callee, handlers);
  if (isMacroHandlerName(handlers, importedHandlerName)) {
    handlers[importedHandlerName](path.get('callee'));
  }
}
function rename(path, newName) {
  path.scope.rename(path.node.name, newName);
}
function replaceOrRemove(path, replacement) {
  var parentPath = path.parentPath;
  if (parentPath !== null && parentPath !== void 0 && parentPath.isExpressionStatement()) {
    path.remove();
  } else {
    path.replaceWith(replacement);
  }
}