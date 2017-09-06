'use strict';

const numberExpression = (value) => {
  return {
    type: 'number',
    value
  };
};

const identifierExpression = (value) => {
  return {
    type: 'identifier',
    value
  };
};

const applicationExpression = (elements) => {
  return {
    type: 'application',
    elements
  };
};

module.exports = {
  numberExpression,
  identifierExpression,
  applicationExpression
};
