const { rename } = require('./utils');

function createTraverseConfigs({ types: t }) {
  const body = {
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

  const stripReturn = {
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

  return { body, stripReturn };
}

module.exports = { createTraverseConfigs };
