[![downloads](https://img.shields.io/npm/dt/eslint-config-standard-prettier-fp.svg?logo=npm)](https://www.npmjs.com/package/eslint-config-standard-prettier-fp) [![last commit](https://img.shields.io/github/last-commit/ehmicky/eslint-config-standard-prettier-fp.svg?logo=github&logoColor=white)](https://github.com/ehmicky/eslint-config-standard-prettier-fp/graphs/contributors) [![license](https://img.shields.io/badge/license-Apache%202.0-4cc61e.svg?logo=github&logoColor=white)](https://www.apache.org/licenses/LICENSE-2.0) [![npm](https://img.shields.io/npm/v/eslint-config-standard-prettier-fp.svg?logo=npm)](https://www.npmjs.com/package/eslint-config-standard-prettier-fp) [![node](https://img.shields.io/node/v/eslint-config-standard-prettier-fp.svg?logo=node.js)](#) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?logo=javascript)](https://standardjs.com) [![eslint-config-standard-prettier-fp](https://img.shields.io/badge/eslint-config--standard--prettier--fp-4cc61e.svg?logo=eslint&logoColor=white)](https://github.com/ehmicky/eslint-config-standard-prettier-fp) [![Gitter](https://img.shields.io/gitter/room/ehmicky-code/eslint-config-standard-prettier-fp.svg?logo=gitter)](https://gitter.im/ehmicky-code/eslint-config-standard-prettier-fp)

[ESLint](https://eslint.org/) is a code linter for JavaScript.

This configuration combines:

- [functional programming](#functional-programming).
- [Standard JavaScript](https://standardjs.com/) which prescribes how to
  format your code.
- [Prettier](https://prettier.io/) which allows you to automatically format
  your code as part of your build process or inside your IDE.
- [editorconfig](https://editorconfig.org/) which fulfills a similar goal but
  more generic and limited.
- [modularity](#modularity) by encouraging splitting your code into small
  modules and functions.
- [modern JavaScript](#modern-javascript).
- [strictness](#stricness).

# Installation

```
$ npm install -D eslint-config-standard-prettier-fp eslint@^5.13.0 eslint-config-prettier@^1.16.4 eslint-config-standard@^12.0.0 eslint-import-resolver-node@^0.3.2 eslint-plugin-eslint-comments@^3.0.1 eslint-plugin-filenames@^1.3.2 eslint-plugin-fp@^2.3.0 eslint-plugin-html@^5.0.3 eslint-plugin-import@^2.16.0 eslint-plugin-markdown@^1.0.0 eslint-plugin-node@^8.0.1 eslint-plugin-promise@^4.0.1 eslint-plugin-standard@^4.0.0 eslint-plugin-unicorn@^7.1.0 eslint-plugin-you-dont-need-lodash-underscore@^6.4.0 prettier@^1.16.4
```

Then in your `.eslintrc.json`:

```json
{
  "extends": "eslint-config-standard-prettier-fp"
}
```

The configuration is very opinionated but you can override specific rules in
your `.eslintrc.json` to fit your needs and coding style.

Then copy the Prettier configuration and `.editorconfig`:

```shell
$ cp node_modules/eslint-config-standard-prettier-fp/.prettierrc.yml node_modules/eslint-config-standard-prettier-fp/.editorconfig .
```

# Badge

The following badge can be added to your project: [![eslint-config-standard-prettier-fp](https://img.shields.io/badge/eslint-config--standard--prettier--fp-4cc61e.svg?logo=eslint&logoColor=white)](https://github.com/ehmicky/eslint-config-standard-prettier-fp)

```markdown
[![eslint-config-standard-prettier-fp](https://img.shields.io/badge/eslint-config--standard--prettier--fp-4cc61e.svg?logo=eslint&logoColor=white)](https://github.com/ehmicky/eslint-config-standard-prettier-fp)
```

# Prettier

`prettier` must be run before `eslint` to avoid conflicts.

We recommend using first `prettier --write` then `eslint --fix --cache`.

Do not forget to add `.eslintcache` to your `.gitignore` file.

# Functional programming

This enforces that state is never directly mutated and global state is not
referenced:

- [immutability: mutating variables or object properties is not allowed](https://github.com/jfmengels/eslint-plugin-fp/blob/master/docs/rules/no-mutation.md).
  In other words it enforces no assignment after declaration, i.e. variables
  must be copied instead of mutated.
- no global variables except the ones that are built-in (e.g. `module` or
  `Object`) unless they are Node-specific (e.g. `process`) or should be wrapped
  (e.g. `console`).
- [loops (`for`, `while`, `switch`) are forbidden as they imply state](https://github.com/jfmengels/eslint-plugin-fp/blob/master/docs/rules/no-loops.md).
  Instead functional methods (like `Array.map()` and `Array.filter()`),
  recursion and small `if` blocks (with
  [early returns](https://eslint.org/docs/rules/no-else-return)) can be used.
- [Classes/OOP are forbidden as they imply state](https://github.com/jfmengels/eslint-plugin-fp/blob/master/docs/rules/no-class.md).
  To inherit/share behavior, one can use
  [composition](https://en.wikipedia.org/wiki/Composition_over_inheritance)
  or [Generic programming](https://en.wikipedia.org/wiki/Generic_programming)
  instead.
- [Events are forbidden](https://github.com/jfmengels/eslint-plugin-fp/blob/master/docs/rules/no-events.md)
  as they imply state.

However throwing exceptions are allowed as this can simplify code.

# Modularity

The following rules are enforced to encourage splitting your code into small
modules and functions:

- [lines are at most 80 characters long](https://eslint.org/docs/rules/max-len)
- [lines are at most 2 statements long](https://eslint.org/docs/rules/max-statements-per-line)
- [branches/blocks cannot be nested](https://eslint.org/docs/rules/max-depth)
- [functions have at most 4 branches/blocks](https://eslint.org/docs/rules/complexity)
  (cyclomatic complexity)
- [functions are at most 10 statements long](https://eslint.org/docs/rules/max-statements)
- [files are at most 90 non-empty lines long](https://eslint.org/docs/rules/max-lines)
- [files have at most 10 dependencies](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/max-dependencies.md)
  (`require`/`import`)

# Modern JavaScript

- [object and array destructuring](https://eslint.org/docs/rules/prefer-destructuring)
- [object spreading](https://eslint.org/docs/rules/prefer-object-spread):
  `{ ...object }` instead of `Object.assign({}, ...object)`
- [arguments spreading](https://eslint.org/docs/rules/prefer-spread):
  `funcName(...args)` instead of
  `funcName.call(this, ...args)`
- [parameters spreading](https://eslint.org/docs/rules/prefer-rest-params):
  `function(...args)` instead of `function(arguments)`
- [template strings instead of concatenation](https://eslint.org/docs/rules/prefer-template)
- [`async`/`await` instead of explicit promises or callbacks](https://github.com/xjamundx/eslint-plugin-promise/blob/master/docs/rules/prefer-await-to-then.md).
- [`**` instead of `Math.pow()`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-exponentiation-operator.md)
- vanilla JavaScript
  [instead of Lodash/Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore)
- [only JavaScript features supported by the Node.js version specified in your
  `package.json` `engines` field](https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features.md).

# Strictness

The configuration is very explicit and enforces strict linting. This should
help you find bugs and maintain a consistent coding style.

This includes:

- [`use strict`](https://eslint.org/docs/rules/strict)
- [typecasting must be explicit](https://eslint.org/docs/rules/no-implicit-coercion)
- [file dependencies must be sorted](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md)
- [variable names must remain short](https://eslint.org/docs/rules/id-length)
- [constants must be assigned to variables](https://eslint.org/docs/rules/no-magic-numbers)
- [avoiding turning off ESLint rules with comments](https://github.com/mysticatea/eslint-plugin-eslint-comments)
- [RegExps must use the `u` flag](https://eslint.org/docs/rules/require-unicode-regexp)
- [no variable shadowing](https://eslint.org/docs/rules/no-shadow)

# Other styling rules

- [named parameters (i.e. passing an object as single parameter) instead of
  positional parameters.](https://eslint.org/docs/rules/max-params)
- [using `index.js` files and `require('./dir')` instead of
  `require('./dir/subdir')`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-internal-modules.md)
- [function declarations must be `const funcName = function() { ... }`](https://eslint.org/docs/rules/func-style)
- [errors must be named `error`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/catch-error-name.md)

# HTML and Markdown

[eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html) and
[eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown) are
included so you can lint JavaScript inside HTML or Markdown files.

# Projects using this configuration

- [autoserver](https://github.com/ehmicky/autoserver):
  create a full-featured REST/GraphQL API from a configuration file

Feel free to submit an issue or PR to add your project to the list above!
