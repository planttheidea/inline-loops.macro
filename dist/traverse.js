"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTraverseConfigs = createTraverseConfigs;
var _utils = require("./utils");
function createTraverseConfigs(_ref) {
  var t = _ref.types;
  var body = {
    ArrayPattern: function (_ArrayPattern) {
      function ArrayPattern(_x) {
        return _ArrayPattern.apply(this, arguments);
      }
      ArrayPattern.toString = function () {
        return _ArrayPattern.toString();
      };
      return ArrayPattern;
    }(function (arrayPatternPath) {
      arrayPatternPath.get('elements').forEach(function (element) {
        if (element.isIdentifier()) {
          (0, _utils.rename)(element);
        }
      });
    }),
    ObjectPattern: function (_ObjectPattern) {
      function ObjectPattern(_x2) {
        return _ObjectPattern.apply(this, arguments);
      }
      ObjectPattern.toString = function () {
        return _ObjectPattern.toString();
      };
      return ObjectPattern;
    }(function (objectPatternPath) {
      objectPatternPath.get('properties').forEach(function (property) {
        var value = property.get('value');
        if (!Array.isArray(value) && value.isIdentifier()) {
          (0, _utils.rename)(value);
        }
      });
    }),
    ReturnStatement: function (_ReturnStatement) {
      function ReturnStatement(_x3, _x4) {
        return _ReturnStatement.apply(this, arguments);
      }
      ReturnStatement.toString = function () {
        return _ReturnStatement.toString();
      };
      return ReturnStatement;
    }(function (returnPath, returnState) {
      var _returnPath$parentPat;
      var statementParent = (_returnPath$parentPat = returnPath.parentPath) === null || _returnPath$parentPat === void 0 ? void 0 : _returnPath$parentPat.getStatementParent();
      if (statementParent !== null && statementParent !== void 0 && statementParent.isIfStatement() || statementParent !== null && statementParent !== void 0 && statementParent.isSwitchStatement()) {
        // If conditional returns exist, bail out inlining return statement.
        returnState.value = null;
        returnState.count = Infinity;
        return;
      }
      returnState.value = returnState.count ? null : returnPath.get('argument').node;
      returnState.count++;
    }),
    ThisExpression: function (_ThisExpression) {
      function ThisExpression(_x5, _x6) {
        return _ThisExpression.apply(this, arguments);
      }
      ThisExpression.toString = function () {
        return _ThisExpression.toString();
      };
      return ThisExpression;
    }(function (thisPath, thisState) {
      thisState.containsThis = true;
    }),
    VariableDeclarator: function (_VariableDeclarator) {
      function VariableDeclarator(_x7) {
        return _VariableDeclarator.apply(this, arguments);
      }
      VariableDeclarator.toString = function () {
        return _VariableDeclarator.toString();
      };
      return VariableDeclarator;
    }(function (variablePath) {
      var id = variablePath.get('id');
      if (id.isIdentifier()) {
        (0, _utils.rename)(id);
      }
    })
  };
  var stripReturn = {
    ReturnStatement: function (_ReturnStatement2) {
      function ReturnStatement(_x8) {
        return _ReturnStatement2.apply(this, arguments);
      }
      ReturnStatement.toString = function () {
        return _ReturnStatement2.toString();
      };
      return ReturnStatement;
    }(function (returnPath) {
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
    })
  };
  return {
    body: body,
    stripReturn: stripReturn
  };
}