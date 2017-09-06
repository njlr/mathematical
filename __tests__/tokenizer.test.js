'use strict';

import { tokenize } from '../tokenizer.js';

describe('tokenize', () => {
  it('should tokenize numbers', () => {
    expect(tokenize('123').value).toEqual([{ type: 'number', value: 123 }]);
  });

  it('should tokenize identifiers', () => {
    expect(tokenize(' + - * / ').value).toEqual([
      { type: 'identifier', value: '+' },
      { type: 'identifier', value: '-' },
      { type: 'identifier', value: '*' },
      { type: 'identifier', value: '/' }
    ]);
  });
});
