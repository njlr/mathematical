'use strict';

import Result from './result.js';
import AST from './ast.js';

const parse = (tokens) => {

  let position = 0;

  const peek = () => {
    if (position < tokens.length) {
      return tokens[position];
    }
    return {
      type: 'eos'
    };
  };

  const move = () => {
    if (position < tokens.length) {
      position++;
    }
  };

  const parseNumber = () => {
    if (!peek().type == 'number') {
      return Result.failure('Expected an number but got a ' + peek().type);
    }
    const expression = AST.numberExpression(peek().value);
    move();
    return Result.success(expression);
  };

  const parseIdentifier = () => {
    if (!peek().type == 'identifier') {
      return Result.failure('Expected an identifier but got a ' + peek().type);
    }
    const expression = AST.identifierExpression(peek().value);
    move();
    return Result.success(expression);
  };

  const parseApplication = () => {
    if (!peek().type == 'leftParen') {
      return Result.failure('Expected an expression but got a ' + peek().type);
    }
    move();
    let elements = [];
    while (peek().type != 'rightParen') {
      const i = parseExpression();
      if (!Result.isSuccess(i)) {
        return i;
      }
      elements.push(i.value);
    }
    move();
    const expression = AST.applicationExpression(elements);
    return Result.success(expression);
  };

  const parseExpression = () => {
    if (peek().type == 'number') {
      return parseNumber();
    }
    if (peek().type == 'leftParen') {
      return parseApplication();
    }
    if (peek().type == 'identifier') {
      return parseIdentifier();
    }
    return Result.failure('Expected an expression but got a ' + peek().type);
  };

  const i = parseExpression();
  if (Result.isSuccess(i)) {
    if (peek().type != 'eos') {
      return Result.failure('Expected an EoS but got a ' + peek().type);
    }
  }
  return i;
};

module.exports = {
  parse
};
