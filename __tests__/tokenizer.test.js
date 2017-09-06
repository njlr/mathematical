'use strict';

import { tokenize } from '../tokenizer.js';

describe('tokenize', () => {
  it('should tokenize numbers', () => {
    expect(tokenize('123').tokens).toEqual([{ type: 'number', value: 123 }]);
  });

  it('should tokenize identifiers', () => {
    expect(tokenize(' + - * / ').tokens).toEqual([
      { type: 'identifier', value: '+' },
      { type: 'identifier', value: '-' },
      { type: 'identifier', value: '*' },
      { type: 'identifier', value: '/' }
    ]);
  });
});
