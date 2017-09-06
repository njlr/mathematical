'use strict';

const prettyPrint = (ast) => {
  if (ast.type == 'number') {
    return ast.value;
  }
  if (ast.type == 'identifier') {
    return ast.value;
  }
  if (ast.type == 'application') {
    return '(' + ast.elements.map(x => prettyPrint(x)).join(' ') + ')';
  }
};

module.exports = {
  prettyPrint
};
