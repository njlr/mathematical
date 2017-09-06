'use strict';

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
      return {
        result: 'failure',
        reason: 'Expected an number but got a ' + peek().type
      };
    }
    const expression = AST.numberExpression(peek().value);
    move();
    return {
      result: 'success',
      expression
    };
  };

  const parseIdentifier = () => {
    if (!peek().type == 'identifier') {
      return {
        result: 'failure',
        reason: 'Expected an identifier but got a ' + peek().type
      };
    }
    const expression = AST.identifierExpression(peek().value);
    move();
    return {
      result: 'success',
      expression
    };
  };

  const parseApplication = () => {
    if (!peek().type == 'leftParen') {
      return {
        result: 'failure',
        reason: 'Expected an expression but got a ' + peek().type
      };
    }
    move();
    let elements = [];
    while (peek().type != 'rightParen') {
      const i = parseExpression();
      if (i.result != 'success') {
        return i;
      }
      elements.push(i.expression);
    }
    move();
    const expression = AST.applicationExpression(elements);
    return {
      result: 'success',
      expression
    }
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
    return {
      result: 'failure',
      reason: 'Expected an expression but got a ' + peek().type
    };
  };

  const i = parseExpression();

  if (i.result == 'success') {
    if (peek().type != 'eos') {
      return {
        result: 'failure',
        reason: 'Expected an EOS but got a ' + peek().type
      }
    }
  }

  return i;
};

module.exports = {
  parse
};
