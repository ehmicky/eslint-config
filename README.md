[![Travis](https://img.shields.io/badge/cross-platform-4cc61e.svg?logo=travis)](https://travis-ci.org/ehmicky/eslint-config-standard-prettier-fp)
[![Node](https://img.shields.io/node/v/eslint-config-standard-prettier-fp.svg?logo=node.js)](https://www.npmjs.com/package/eslint-config-standard-prettier-fp)
[![Gitter](https://img.shields.io/gitter/room/ehmicky/eslint-config-standard-prettier-fp.svg?logo=gitter)](https://gitter.im/ehmicky/eslint-config-standard-prettier-fp)
[![Twitter](https://img.shields.io/badge/%E2%80%8B-twitter-4cc61e.svg?logo=twitter)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/%E2%80%8B-medium-4cc61e.svg?logo=medium)](https://medium.com/@ehmicky)

[ESLint](https://eslint.org/) configuration combining:

- [functional programming](#functional-programming).
- [Standard JavaScript](https://standardjs.com/) which prescribes how to format
  your code.
- [Prettier](https://prettier.io/) which automatically formats your code as part
  of your build process or inside your IDE.
- [editorconfig](https://editorconfig.org/) which fulfills a similar goal but
  more generic and limited.
- [modularity](#modularity) by encouraging splitting your code into small
  modules and functions.
- [modern JavaScript](#modern-javascript).
- [strictness](#stricness).

The configuration is very opinionated but you can override specific rules in
your `.eslintrc` to fit your needs and coding style.

# Install

```
$ npm install -D eslint-config-standard-prettier-fp eslint@^6.0.0-alpha.0 eslint-config-prettier@^4.2.0 eslint-config-standard@^12.0.0 eslint-import-resolver-node@^0.3.2 eslint-plugin-ava@^6.0.0 eslint-plugin-eslint-comments@^3.1.1 eslint-plugin-filenames@^1.3.2 eslint-plugin-fp@^2.3.0 eslint-plugin-html@^5.0.3 eslint-plugin-import@^2.17.2 eslint-plugin-markdown@^1.0.0 eslint-plugin-node@^9.0.0 eslint-plugin-promise@^4.1.1 eslint-plugin-standard@^4.0.0 eslint-plugin-unicorn@^8.0.2 eslint-plugin-you-dont-need-lodash-underscore@^6.4.0 prettier@^1.17.0
```

Then add the following files.

`.eslintrc.yml`:

```yml
extends: standard-prettier-fp/.eslintrc.yml
```

`.prettierrc.yml`:

```yml
eslint-config-standard-prettier-fp
```

`.gitattributes`:

```
* text=auto eol=lf
```

Finally copy the `.editorconfig`:

```shell
$ cp node_modules/eslint-config-standard-prettier-fp/.editorconfig .
```

# Prettier

`prettier` must be run before `eslint` to avoid conflicts.

We recommend using first `prettier --write` then `eslint --fix --cache`.

Do not forget to add `.eslintcache` to your `.gitignore` file.

# Coding style

## Functional programming

State should be immutable.

Variables and object properties should be read-only. They should be copied
instead of mutated. Assignment should only happen during declaration.

The following patterns should be avoided as they imply state:

- loops (`for`, `while`). Use functional methods (like `Array.map()` and
  `Array.filter()`) and recursion instead.
- classes/OOP. To inherit/share behavior, use composition or generic programming
  instead.
- events. Use promises and streams instead.

Global variables should not be used except the ones that are built-in (e.g.
`Object`).

Throwing exceptions is allowed as this can simplify code.

## Modularity

Code should be split into small files and functions:

- files have at most 90 non-empty lines and 10 dependencies.
- functions have at most 4 branches and 10 statements.
- branches/blocks should not be nested.
- lines are at most 80 characters long.

## Modern JavaScript

- ES modules. Exports should be named (no `export default`).
- object and array destructuring.
- object spreading: `{ ...object }` instead of `Object.assign({}, ...object)`
- arguments spreading: `funcName(...args)` instead of
  `funcName.call(this, ...args)`
- parameters spreading: `function(...args)` instead of `function(arguments)`
- template strings instead of concatenation.
- `async`/`await` instead of explicit promises or callbacks.
- vanilla JavaScript instead of Lodash/Underscore.
- only JavaScript features supported by the Node.js version specified in your
  `package.json` `engines` field.

## Strictness

The configuration is very explicit and enforces strict linting. This should help
you find bugs and maintain a consistent coding style:

- no dead code.
- typecasting should be explicit.
- file dependencies should be sorted.
- variable names should remain short.
- constants should be assigned to variables.
- avoiding turning off ESLint rules with comments.
- RegExps should use the `u` flag.
- no variables shadowing.

## Other styling rules

- named parameters (i.e. passing an object as single parameter) instead of
  positional parameters.
- function declarations should be `const funcName = function() { ... }`

# HTML and Markdown

[eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html) and
[eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown) are
included so you can lint JavaScript inside HTML or Markdown files.

# Support

If you found a bug or would like a new feature, _don't hesitate_ to
[submit an issue on GitHub](../../issues).

For other questions, feel free to
[chat with us on Gitter](https://gitter.im/ehmicky/eslint-config-standard-prettier-fp).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks goes to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/eslint-config-standard-prettier-fp/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/eslint-config-standard-prettier-fp/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
