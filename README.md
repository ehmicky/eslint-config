[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/@ehmicky/eslint-config)
[![Browsers](https://img.shields.io/badge/-Browsers-808080?logo=firefox&colorA=404040)](https://www.npmjs.com/package/@ehmicky/eslint-config)
[![Mastodon](https://img.shields.io/badge/-Mastodon-808080.svg?logo=mastodon&colorA=404040&logoColor=9590F9)](https://fosstodon.org/@ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

[ESLint](https://eslint.org/) configuration for my own projects.

This is not meant to be shared and semantic versioning is not followed.

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
- parameters spreading: `(...args) => ...` instead of `(arguments) => ...`
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
- arrow functions should be preferred

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/eslint-config/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/eslint-config/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
-->
<!-- ALL-CONTRIBUTORS-LIST:END -->
