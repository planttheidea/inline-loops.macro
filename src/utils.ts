import type { NodePath as Path } from '@babel/core';
import {
  CallExpression,
  Expression,
  ExpressionStatement,
  Identifier,
  ObjectProperty,
  StringLiteral,
} from '@babel/types';
import { MacroError, MacroParams } from 'babel-plugin-macros';
import { Handlers, LocalReferences } from './types';
import { createTemplates } from 'templates';

export function getCachedFnArgs(local: LocalReferences, isReduce?: boolean) {
  return isReduce
    ? [local.accumulated, local.value, local.key, local.collection]
    : [local.value, local.key, local.collection];
}

export function getImportedHandlerName(
  callee: Path<Identifier>,
  handlers: Handlers,
) {
  const binding = callee.scope.getBinding(callee.node.name);

  if (!binding) {
    return;
  }

  const owner = binding.path;

  if (owner.isImportSpecifier()) {
    const imported = owner.get('imported') as Path<Identifier | StringLiteral>;
    const name = imported.isIdentifier()
      ? imported.node.name
      : (imported.node as StringLiteral).value;

    if (!Object.keys(handlers).some((handler) => handler === name)) {
      return;
    }

    const importSource = owner.parentPath.get(
      'source.value',
    ) as unknown as Path<string>;

    if (!importSource.node.endsWith('inline-loops.macro')) {
      return;
    }

    return name;
  }

  if (owner.isVariableDeclarator()) {
    const init = owner.get('init');

    if (
      !init ||
      !init.isCallExpression() ||
      !init.get('callee').isIdentifier({ name: 'require' })
    ) {
      return;
    }

    const requireSource = init.get(
      'arguments.0.value',
    ) as unknown as Path<string>;

    if (!requireSource.node.endsWith('inline-loops.macro')) {
      return;
    }

    const imported = owner.get('id.properties').find((property) => {
      const value = (property as Path<ObjectProperty>).get('value');

      return value.isIdentifier({ name: callee.node.name });
    });

    if (!imported) {
      return;
    }

    const name = (imported.get('key') as Path<Identifier>).node.name;

    if (!Object.keys(handlers).some((handler) => handler === name)) {
      return;
    }

    return name;
  }
}

export function getLocalName(
  path: Path,
  name = path.isIdentifier() ? path.node.name : undefined,
) {
  return path.scope.generateUidIdentifier(name);
}

export function handleArrowFunctionExpressionUse(path: Path<CallExpression>) {
  if (path.parentPath.isArrowFunctionExpression()) {
    path.parentPath.arrowFunctionToExpression({
      allowInsertArrow: false,
      noNewArrows: true,
    });
  }
}

export function handleInvalidUsage(
  path: Path<CallExpression>,
  handlers: Handlers,
) {
  const [collection, handler] = path.get('arguments');

  if (collection?.isSpreadElement()) {
    throw new MacroError(
      'You cannot use spread arguments with `inline-loops.macro`; please declare the arguments explicitly.',
    );
  }

  const importedHandlerName = getImportedHandlerName(
    handler as Path<Identifier>,
    handlers,
  );

  if (importedHandlerName) {
    throw new MacroError(
      'You cannot use a method from `inline-loops.macro` directly as a handler; please wrap it in a export function call.',
    );
  }
}

export function isMacroHandlerName(
  handlers: Handlers,
  name: string | undefined,
): name is keyof Handlers {
  return !!(name && handlers[name as keyof Handlers]);
}

export function processNestedInlineLoopMacros(path: Path, handlers: Handlers) {
  if (!path.isCallExpression()) {
    return;
  }

  const callee = path.get('callee');

  if (!callee.isIdentifier()) {
    return;
  }

  const importedHandlerName = getImportedHandlerName(callee, handlers);

  if (isMacroHandlerName(handlers, importedHandlerName)) {
    handlers[importedHandlerName](path.get('callee'));
  }
}

export function rename(path: Path<Identifier>, newName?: string) {
  path.scope.rename(path.node.name, newName);
}

export function replaceOrRemove(
  { types: t }: MacroParams['babel'],
  path: Path<CallExpression>,
  local: LocalReferences,
  templates: ReturnType<typeof createTemplates>,
  replacement: Expression,
) {
  if (shouldWrapInClosure(path)) {
    // if (shouldWrapInClosure(path, local)) {
    if (!t.isIdentifier(replacement, { name: 'undefined' })) {
      local.contents.push(t.returnStatement(replacement));
    }

    const iife = templates.iife({
      BODY: local.contents.flat(),
    }) as ExpressionStatement;

    path.replaceWith(iife.expression);
  } else {
    const statement = path.getStatementParent();

    if (!statement) {
      throw new MacroError(
        'Could not insert contents because the statement was indeterminable.',
      );
    }

    local.contents.forEach((content) => {
      statement.insertBefore(content);
    });

    const parentPath = path.parentPath;

    if (parentPath?.isExpressionStatement()) {
      path.remove();
    } else {
      path.replaceWith(replacement);
    }
  }
}

export function isPossiblyDynamic(path: Path) {
  if (path.isPattern()) {
    return true;
  }

  if (
    path.isBinaryExpression() ||
    path.isCallExpression() ||
    path.isTemplateLiteral()
  ) {
    return isPossiblyDynamic(path.parentPath);
  }

  return path.isExpression();
}

export function shouldWrapInClosure(
  path: Path,
  // local: LocalReferences,
): boolean {
  const parentPath = path.parentPath;

  if (!parentPath) {
    return false;
  }

  if (parentPath.isAssignmentPattern()) {
    return true;
  }

  if (
    parentPath.isAwaitExpression() ||
    parentPath.isBinaryExpression() ||
    parentPath.isArrayExpression() ||
    parentPath.isObjectExpression() ||
    parentPath.isObjectProperty() ||
    parentPath.isUnaryExpression()
  ) {
    return shouldWrapInClosure(parentPath);
  }

  if (parentPath.isLogicalExpression()) {
    return (
      !path.isCallExpression() ||
      parentPath.get('right').node === path.node ||
      shouldWrapInClosure(parentPath)
    );
  }

  if (parentPath.isConditionalExpression()) {
    return (
      !path.isCallExpression() ||
      parentPath.get('test').node !== path.node ||
      shouldWrapInClosure(parentPath)
    );
  }

  const functionParent = path.getFunctionParent();

  if (
    !functionParent ||
    parentPath.node === functionParent.node ||
    parentPath.parent === functionParent.node
  ) {
    return false;
  }

  if (
    (parentPath.isReturnStatement() || parentPath.isExpressionStatement()) &&
    parentPath.parentPath.isBlockStatement() &&
    parentPath.parentPath.parent === functionParent.node
  ) {
    const body = functionParent.get('body.body');

    return !Array.isArray(body) || body.length > 1;
  }

  return true;
}
