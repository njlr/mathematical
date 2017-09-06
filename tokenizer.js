'use strict';

import Result from './result.js';

const tokenize = (input) => {

  let position = 0;
  let tokens = [];

  const isDigit = (c) => {
    return c >= '0' && c <= '9';
  };

  const peek = () => {
    if (position < input.length) {
      return input[position];
    }
    return null;
  };

  const move = () => {
    if (position < input.length) {
      position++;
    }
  };

  const processNumber = () => {
    const start = position;
    while (peek() != null && isDigit(peek())) {
      move();
    }
    return {
      type: 'number',
      value: Number(input.substring(start, position))
    };
  };

  const processOperator = () => {
    if (peek() == '+') {
      move();
      return {
        type: 'identifier',
        value: '+'
      };
    }
    if (peek() == '-') {
      move();
      return {
        type: 'identifier',
        value: '-'
      };
    }
    if (peek() == '*') {
      move();
      return {
        type: 'identifier',
        value: '*'
      };
    }
    if (peek() == '/') {
      move();
      return {
        type: 'identifier',
        value: '/'
      };
    }
    if (peek() == '(') {
      move();
      return {
        type: 'leftParen'
      };
    }
    if (peek() == ')') {
      move();
      return {
        type: 'rightParen'
      };
    }
  };

  while (peek() != null) {
    const next = peek();
    if (next == ' ') {
      move();
      continue;
    }
    if (next == '+' || next == '-' || next == '*' || next == '/' || next == '(' || next == ')') {
      tokens.push(processOperator());
      continue;
    }
    if (isDigit(next)) {
      tokens.push(processNumber());
      continue;
    }
    return Result.failure('Unexpected character "' + next + '" at position ' + position);
  }
  return Result.success(tokens);
};

module.exports = {
  tokenize
};
