# Mathematical!

![Alt text](/mathematical.png?raw=true "Mathematical")

Mathematical expressions in a lispy syntax. 

Test it out in [the online REPL](https://njlr.github.io/mathematical/)!

## Instructions

```bash=
# Install NPM modules
yarn install --dev

# Build the code
yarn run build

# Run the example
yarn run example && node ./output/example.js

# Run the tests
yarn test
```

## Examples

The language is lisp-like, but it only supports numbers and basic operators.

```
1
(+ 1 2)
(+ (- 3 4) (* 2 3))
```

## FAQ

### What can I use this for?

Probably nothing. You might find it useful to learn from.

### Did you use a framework like ANTLR, Flex, and so on?

Nope! The parser is hand-written JavaScript. The REPL uses React.

### Why did you make this?

To practice writing parsers!
