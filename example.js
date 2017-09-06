'use strict';

import { tokenize, parse, evaluate, prettyPrint } from './index.js';

const source = '(  + 1 2 (  + 4 ( + 5)) )';

console.log(source);

console.log(tokenize(source).flatMap(parse).flatMap(evaluate).map(prettyPrint));
