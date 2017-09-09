'use strict';

import Result from './result.js';
import AST from './ast.js';

const evaluate = (expression) => {
  if (expression.type == 'application' &&
    expression.elements.length > 0 &&
    expression.elements[0].type == 'identifier') {
    const head = expression.elements[0];
    if (head.value == '+') {
      if (expression.elements.length < 2) {
        return Result.failure('+ requires at least 1 argument');
      }
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
    if (head.value == '-') {
      if (expression.elements.length < 2) {
        return Result.failure('- requires at least 1 argument');
      }
      let total = 0;
      for (const element of expression.elements.slice(1)) {
        const i = evaluate(element);
        if (!Result.isSuccess(i)) {
          return i;
        }
        if (i.value.type != 'number') {
          return Result.failure('- can only operate on numbers');
        }
        total -= i.value.value;
      }
      return Result.success(AST.numberExpression(total));
    }
    if (head.value == '*') {
      if (expression.elements.length < 2) {
        return Result.failure('* requires at least 1 argument');
      }
      let total = 1;
      for (const element of expression.elements.slice(1)) {
        const i = evaluate(element);
        if (!Result.isSuccess(i)) {
          return i;
        }
        if (i.value.type != 'number') {
          return Result.failure('* can only operate on numbers');
        }
        total *= i.value.value;
      }
      return Result.success(AST.numberExpression(total));
    }
    if (head.value == '/') {
      if (expression.elements.length < 3) {
        return Result.failure('/ requires at least 2 arguments');
      }
      const i = evaluate(expression.elements[1]);
      if (!Result.isSuccess(i)) {
        return i;
      }
      if (i.value.type != 'number') {
        return Result.failure('/ can only operate on numbers');
      }
      let total = i.value.value;
      for (const element of expression.elements.slice(2)) {
        const i = evaluate(element);
        if (!Result.isSuccess(i)) {
          return i;
        }
        if (i.value.type != 'number') {
          return Result.failure('/ can only operate on numbers');
        }
        total /= i.value.value;
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
