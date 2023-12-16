import type { NodePath as Path } from '@babel/core';
import {
  ArrayPattern,
  Expression,
  ObjectPattern,
  ReturnStatement,
  ThisExpression,
  VariableDeclarator,
} from '@babel/types';
import type { Babel } from './types';
import { rename } from './utils';

interface BodyState {
  containsThis: boolean;
  count: number;
  value: Expression | null | undefined;
}

interface StripReturnState {
  isForEach?: boolean;
}

export function createTraverseConfigs({ types: t }: Babel) {
  const body = {
    ArrayPattern(arrayPatternPath: Path<ArrayPattern>) {
      arrayPatternPath.get('elements').forEach((element) => {
        if (element.isIdentifier()) {
          rename(element);
        }
      });
    },
    ObjectPattern(objectPatternPath: Path<ObjectPattern>) {
      objectPatternPath.get('properties').forEach((property) => {
        const value = property.get('value');

        if (!Array.isArray(value) && value.isIdentifier()) {
          rename(value);
        }
      });
    },
    ReturnStatement(returnPath: Path<ReturnStatement>, returnState: BodyState) {
      const statementParent = returnPath.parentPath?.getStatementParent();

      if (
        statementParent?.isIfStatement() ||
        statementParent?.isSwitchStatement()
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
    ThisExpression(thisPath: Path<ThisExpression>, thisState: BodyState) {
      thisState.containsThis = true;
    },
    VariableDeclarator(variablePath: Path<VariableDeclarator>) {
      const id = variablePath.get('id');

      if (id.isIdentifier()) {
        rename(id);
      }
    },
  };

  const stripReturn = {
    ReturnStatement(
      returnPath: Path<ReturnStatement>,
      returnState: StripReturnState = {},
    ) {
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

  return { body, stripReturn };
}
