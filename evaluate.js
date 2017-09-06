'use strict';

import Result from './result.js';
import AST from './ast.js';

const evaluate = (expression) => {
  if (expression.type == 'application' &&
    expression.elements.length > 1 &&
    expression.elements[0].type == 'identifier') {
    const head = expression.elements[0];
    if (head.value == '+') {
      let total = 0;
      for (const element of expression.elements.slice(1)) {
        const i = evaluate(element);
        if (!Result.isSuccess(i)) {
          return i;
        }
        if (i.value.type != 'number') {
          return Result.failure('+ can only operate on numbers');
        }
        total += i.value.value;
      }
      return Result.success(AST.numberExpression(total));
    }
    return Result.failure('Unrecognized operator ' + head.value);
  }
  return Result.success(expression);
};

module.exports = {
  evaluate
};
