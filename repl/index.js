'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Result from '../result.js';
import { tokenize, parse, evaluate, prettyPrint } from '../index.js';

window.onload = () => {

  const root = document.getElementById('root');

  const render = (source) => {

    const onChange = (e) => {
      render(e.target.value);
    };

    const result = tokenize(source)
      .flatMap(parse)
      .flatMap(evaluate)
      .map(prettyPrint);

    const resultElement = Result.isSuccess(result) ?
      React.createElement('p', { style: { 'color': '#5f5' } }, result.value) :
      React.createElement('p', { style: { 'color': '#f55' } }, result.reason);

    ReactDOM.render(
      React.createElement('div', null,
        React.createElement('h1', null, 'Mathematical!'),
        React.createElement('textArea', { rows: 10, cols: 50, defaultValue: source, onChange }, null),
        resultElement),
      root);
  };

  render('(+ 1 2)');
};
