/* eslint-disable id-length, max-lines, no-magic-numbers,
   import/max-dependencies */
import { builtinModules } from 'node:module'

import { fixupPluginRules } from '@eslint/compat'
import markdown from '@eslint/markdown'
import stylisticJs from '@stylistic/eslint-plugin-js'
import stylisticPlus from '@stylistic/eslint-plugin-plus'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import ava from 'eslint-plugin-ava'
import eslintComments from 'eslint-plugin-eslint-comments'
import filenames from 'eslint-plugin-filenames'
import fp from 'eslint-plugin-fp'
import html from 'eslint-plugin-html'
import importPlugin from 'eslint-plugin-import'
import n from 'eslint-plugin-n'
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import promise from 'eslint-plugin-promise'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import typescriptEslint from 'typescript-eslint'

// Prefer `if` + `throw new Error()` instead of `assert()` as it does not work
// in browsers
const avoidAssert = {
  group: ['node:assert', 'assert', 'node:assert/strict', 'assert/strict'],
  message: 'Please throw an Error instead',
}

const avoidUnitTests = {
  group: ['./*', '!./helpers', '!./fixtures'],
  message:
    'Individual files should not be imported in tests. Instead please use import the main module.',
}

const nExtensions = [
  '.js',
  '.cjs',
  '.mjs',
  '.ts',
  '.cts',
  '.mts',
  '.json',
  '.node',
]

const mutableProperties = [
  { object: 'process', property: 'exitCode' },
  { object: 'error' },
  { object: 'req' },
  { object: 'request' },
  { object: 'res' },
  { object: 'response' },
  { object: 'state' },
]

const mutableObjects = mutableProperties.map(({ object }) => object)

// Allow default exports for those Node.js code modules
const DEFAULT_BUILTIN_MODULES = new Set([
  'assert',
  'assert/strict',
  'module',
  'process',
])

const importStyles = Object.fromEntries(
  builtinModules.map((builtinModule) => [
    `node:${builtinModule}`,
    { named: true, default: DEFAULT_BUILTIN_MODULES.has(builtinModule) },
  ]),
)

const forbiddenGlobals = [
  // Use `globalThis` instead
  'global',
  'GLOBAL',
  // Use module.exports instead
  'exports',
  // Use import ... from 'node:process|buffer' instead
  'process',
  'Buffer',
]

// Some rules have both JavaScript and TypeScript equivalents.
// This is the set for JavaScript.
const javaScriptRules = {
  // Conflicts with Prettier
  '@stylistic/js/block-spacing': 0,
  '@stylistic/js/brace-style': 0,
  '@stylistic/js/comma-dangle': 0,
  '@stylistic/js/comma-spacing': 0,
  '@stylistic/js/function-call-spacing': 0,
  '@stylistic/js/indent': 0,
  '@stylistic/js/key-spacing': 0,
  '@stylistic/js/keyword-spacing': 0,
  '@stylistic/js/lines-around-comment': 0,
  '@stylistic/js/no-extra-parens': 0,
  '@stylistic/js/no-extra-semi': 0,
  '@stylistic/js/object-curly-spacing': 0,
  '@stylistic/js/quotes': 0,
  '@stylistic/js/semi': 0,
  '@stylistic/js/space-before-blocks': 0,
  '@stylistic/js/space-before-function-paren': 0,
  '@stylistic/js/space-infix-ops': 0,

  // Blank lines
  '@stylistic/js/padding-line-between-statements': [
    2,
    {
      blankLine: 'always',
      prev: ['multiline-block-like', 'directive'],
      next: '*',
    },
    { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
  ],
  '@stylistic/js/lines-between-class-members': [
    2,
    'always',
    { exceptAfterSingleLine: true },
  ],

  // Referencing
  'no-unused-vars': 2,
  'no-redeclare': 2,
  'no-shadow': [
    2,
    {
      builtinGlobals: true,
      hoist: 'all',
      allow: ['process', 'Buffer', 'setTimeout', 'setInterval', 'setImmediate'],
    },
  ],
  'no-use-before-define': [
    2,
    { functions: false, classes: false, variables: false },
  ],

  // Declarations
  'no-magic-numbers': [
    2,
    { ignore: [-2, -1, 0, 1, 2, 3, 10, '0n', '1n'], enforceConst: true },
  ],

  // Assignments
  'init-declarations': 2,
  'no-unused-expressions': 2,

  // Functions
  'no-loop-func': 2,
  'max-params': 2,
  'default-param-last': 2,
  'no-empty-function': 2,

  // Objects
  'dot-notation': 2,
  'prefer-destructuring': 2,

  // Inheritance
  'no-useless-constructor': 2,
  'class-methods-use-this': 2,
  'no-invalid-this': 2,
  'no-dupe-class-members': 2,

  // Arrays
  'no-array-constructor': 2,

  // Number
  'no-loss-of-precision': 2,

  // Async
  'prefer-promise-reject-errors': 2,
  'require-await': 2,

  // Modules
  // Prefer `if` + `throw new Error()` instead of `assert()` as it does not
  // work in browsers
  'no-restricted-imports': [2, { patterns: [avoidAssert] }],

  // To avoid
  'no-implied-eval': 2,
}

// This is the set of those rules for TypeScript
const typeScriptRules = {
  // Same rules as JavaScript files, but for TypeScript
  ...Object.fromEntries(
    Object.entries(javaScriptRules).map(([ruleName, definition]) =>
      ruleName.startsWith('@stylistic/js/')
        ? [ruleName.replace('@stylistic/js/', '@stylistic/ts/'), definition]
        : [`@typescript-eslint/${ruleName}`, definition],
    ),
  ),

  // Overrides JavaScript rules definitions
  '@stylistic/ts/padding-line-between-statements': [
    2,
    {
      blankLine: 'always',
      prev: ['multiline-block-like', 'directive', 'interface', 'type'],
      next: '*',
    },
    { blankLine: 'always', prev: '*', next: 'multiline-block-like' },
  ],
  '@typescript-eslint/no-redeclare': [2, { ignoreDeclarationMerge: true }],
  '@typescript-eslint/no-magic-numbers': [
    2,
    {
      ignore: [-2, -1, 0, 1, 2, 3, 10, '0n', '1n'],
      enforceConst: true,
      ignoreEnums: true,
      ignoreNumericLiteralTypes: true,
      ignoreTypeIndexes: true,
    },
  ],
  '@typescript-eslint/prefer-destructuring': [
    2,
    // TODO: uncomment this. This is currently failing due to a bug with
    // @typescript-eslint/eslint-parser for this rule
    // { enforceForDeclarationWithTypeAnnotation: true },
  ],
  '@typescript-eslint/no-restricted-imports': [
    2,
    { patterns: [{ ...avoidAssert, allowTypeImports: true }] },
  ],
}

// TODO: remove once the following is released to `@eslint/compat`
// https://github.com/eslint/rewrite/issues/127
const fixupOldPluginRules = ({ rules, ...plugin }) => ({
  ...plugin,
  rules: Object.fromEntries(
    Object.entries(rules).map(([ruleName, rule]) => [
      ruleName,
      fixupOldPluginRule(rule),
    ]),
  ),
})

const fixupOldPluginRule = (rule) => ({
  ...rule,
  create: typeof rule === 'function' ? rule : rule.create,
  schema: undefined,
  meta: {
    ...rule.meta,
    schema: rule.schema ?? rule.create?.schema ?? [{}],
  },
})

export default [
  importPlugin.flatConfigs.errors,
  {
    // The rules added by eslint-config-prettier are inlined explicitly instead
    plugins: {
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
      '@stylistic/plus': stylisticPlus,
      ava,
      'eslint-comments': fixupPluginRules(eslintComments),
      filenames: fixupPluginRules(fixupOldPluginRules(filenames)),
      fp: fixupPluginRules(fixupOldPluginRules(fp)),
      markdown,
      'prefer-arrow-functions': preferArrowFunctions,
      unicorn,
      n,
      promise,
    },
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: { jsx: false },
        projectService: true,
      },
    },
    linterOptions: { reportUnusedDisableDirectives: 'error' },
    settings: {
      n: { tryExtensions: nExtensions },
      'import/resolver': {
        node: { extensions: nExtensions },
        typescript: { project: 'tsconfig.json' },
      },
    },
    rules: {
      // Conflicts with Prettier
      '@stylistic/js/array-bracket-newline': 0,
      '@stylistic/js/array-bracket-spacing': 0,
      '@stylistic/js/array-element-newline': 0,
      '@stylistic/js/arrow-parens': 0,
      '@stylistic/js/arrow-spacing': 0,
      '@stylistic/js/comma-style': 0,
      '@stylistic/js/computed-property-spacing': 0,
      '@stylistic/js/curly-newline': 0,
      '@stylistic/js/dot-location': 0,
      '@stylistic/js/eol-last': 0,
      '@stylistic/js/function-call-argument-newline': 0,
      '@stylistic/js/function-paren-newline': 0,
      '@stylistic/js/generator-star-spacing': 0,
      '@stylistic/js/implicit-arrow-linebreak': 0,
      '@stylistic/js/jsx-quotes': 0,
      '@stylistic/js/linebreak-style': 0,
      '@stylistic/js/max-len': 0,
      '@stylistic/js/max-statements-per-line': 0,
      '@stylistic/js/new-parens': 0,
      '@stylistic/js/newline-per-chained-call': 0,
      '@stylistic/js/no-confusing-arrow': 0,
      '@stylistic/js/no-floating-decimal': 0,
      '@stylistic/js/no-mixed-operators': 0,
      '@stylistic/js/no-mixed-spaces-and-tabs': 0,
      '@stylistic/js/no-multi-spaces': 0,
      '@stylistic/js/no-multiple-empty-lines': 0,
      '@stylistic/js/no-trailing-spaces': 0,
      '@stylistic/js/no-whitespace-before-property': 0,
      '@stylistic/js/nonblock-statement-body-position': 0,
      '@stylistic/js/object-curly-newline': 0,
      '@stylistic/js/object-property-newline': 0,
      '@stylistic/js/one-var-declaration-per-line': 0,
      '@stylistic/js/operator-linebreak': 0,
      '@stylistic/js/padded-blocks': 0,
      '@stylistic/js/quote-props': 0,
      '@stylistic/js/rest-spread-spacing': 0,
      '@stylistic/js/semi-spacing': 0,
      '@stylistic/js/semi-style': 0,
      '@stylistic/js/space-in-parens': 0,
      '@stylistic/js/space-unary-ops': 0,
      '@stylistic/js/switch-colon-spacing': 0,
      '@stylistic/js/template-curly-spacing': 0,
      '@stylistic/js/template-tag-spacing': 0,
      '@stylistic/js/wrap-iife': 0,
      '@stylistic/js/wrap-regex': 0,
      '@stylistic/js/yield-star-spacing': 0,
      'no-unexpected-multiline': 0,
      'unicorn/no-nested-ternary': 0,
      'unicorn/empty-brace-spaces': 0,
      'unicorn/number-literal-case': 0,
      'unicorn/template-indent': 0,

      // Warned against, but allowed by eslint-config-prettier
      '@stylistic/js/no-tabs': 2,

      // Globals
      'n/prefer-global/console': 2,
      'n/prefer-global/url-search-params': 2,
      'n/prefer-global/text-decoder': 2,
      'n/prefer-global/text-encoder': 2,
      'n/prefer-global/url': 2,
      // We only use globals for globals also defined in the browser
      'n/prefer-global/buffer': [2, 'never'],
      'n/prefer-global/process': [2, 'never'],

      // Comments
      'no-inline-comments': [2, { ignorePattern: 'c8' }],
      '@stylistic/js/multiline-comment-style': [2, 'separate-lines'],
      '@stylistic/js/line-comment-position': 2,
      '@stylistic/js/spaced-comment': [
        2,
        'always',
        {
          line: { markers: ['*package', '!', '/', ',', '='] },
          block: {
            balanced: true,
            markers: ['*package', '!', ',', ':', '::', 'flow-include'],
            exceptions: ['*'],
          },
        },
      ],
      // This makes commenting/uncommenting code tedious
      'capitalized-comments': 0,
      // We allow TODO comments
      'no-warning-comments': 0,
      'unicorn/expiring-todo-comments': 0,
      'eslint-comments/disable-enable-pair': 2,
      'eslint-comments/no-unused-enable': 2,
      'eslint-comments/no-duplicate-disable': 2,
      'eslint-comments/no-unlimited-disable': 2,
      'unicorn/no-abusive-eslint-disable': 2,
      'eslint-comments/no-aggregating-enable': 2,
      // No use
      'eslint-comments/no-restricted-disable': 0,
      'eslint-comments/no-use': [
        2,
        {
          allow: [
            'eslint-disable-next-line',
            'eslint-disable',
            'eslint-enable',
            'eslint-env',
          ],
        },
      ],
      // This requires putting comments on the same line as the ESLint
      // directive, but we prefer to put the comment on the previous line
      'eslint-comments/require-description': 0,
      'eslint-comments/no-unused-disable': 2,

      // Strictness
      strict: 2,

      // Indentation
      '@stylistic/plus/indent-binary-ops': 0,

      // Whitespaces
      'no-irregular-whitespace': 2,
      'unicode-bom': 2,

      // Braces
      curly: 2,

      // Statements
      'no-empty': [2, { allowEmptyCatch: true }],
      'no-unreachable': 2,
      'no-unreachable-loop': 2,

      // Parenthesis
      'unicorn/no-unreadable-iife': 2,

      // Complexity
      'max-lines': [2, { max: 90, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': [
        2,
        { max: 50, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],
      'max-statements': [2, 10],
      'import/max-dependencies': 2,
      // This counts default values as complexity, which prevents using them
      complexity: 0,
      'max-depth': [2, 1],
      'max-nested-callbacks': [2, 1],

      // Referencing
      'no-undef': [2, { typeof: true }],
      'no-undef-init': 2,
      'unicorn/no-unused-properties': 2,
      'no-shadow-restricted-names': 2,

      // Declarations
      'block-scoped-var': 2,
      'no-const-assign': 2,
      'no-var': 2,
      'fp/no-let': 2,
      'import/no-mutable-exports': 2,
      'prefer-const': 2,
      'no-global-assign': 2,
      'no-implicit-globals': [2, { lexicalBindings: true }],
      'one-var': [2, { initialized: 'never' }],
      'vars-on-top': 2,
      'no-inner-declarations': [
        2,
        'functions',
        { blockScopedFunctions: 'disallow' },
      ],
      'sort-vars': 2,

      // Assignments
      'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
      'operator-assignment': 2,
      'logical-assignment-operators': 2,
      'no-multi-assign': 2,
      'prefer-object-spread': 2,
      'unicorn/no-useless-fallback-in-spread': 2,
      'no-cond-assign': 2,
      'no-return-assign': 2,
      'no-self-assign': 2,
      'no-param-reassign': [
        2,
        { props: true, ignorePropertyModificationsFor: mutableObjects },
      ],
      'fp/no-mutation': [2, { commonjs: true, exceptions: mutableProperties }],
      'no-delete-var': 2,
      'fp/no-delete': 2,
      'fp/no-mutating-assign': 2,
      'fp/no-mutating-methods': [
        2,
        {
          allowedObjects: [
            ...mutableObjects,
            // gulp.watch() is flagged as mutable otherwise
            'gulp',
          ],
        },
      ],
      'no-useless-assignment': 2,
      // This is too strict
      'fp/no-unused-expression': 0,
      'no-new': 2,
      'import/no-unassigned-import': [
        2,
        { allow: ['@ehmicky/dev-tasks/register.js'] },
      ],

      // Naming
      camelcase: [
        2,
        { allow: ['^UNSAFE_'], properties: 'never', ignoreGlobals: true },
      ],

      'id-length': [
        2,
        {
          max: 24,
          exceptions: [
            // ava requires `test` to be called `t` for `power-assert` to work
            't',
            // Returned by yargs
            '_',
          ],
        },
      ],
      'id-match': [2, '^[A-Za-z0-9_]+$', { onlyDeclarations: true }],
      'no-underscore-dangle': [
        2,
        {
          enforceInMethodNames: true,
          allowInArrayDestructuring: false,
          allowInObjectDestructuring: false,
          // Often used in several libraries
          allow: ['_id'],
        },
      ],
      // Too unstable for the moment:
      //   https://github.com/sindresorhus/eslint-plugin-unicorn/issues/269
      //   https://github.com/sindresorhus/eslint-plugin-unicorn/issues/270
      'unicorn/prevent-abbreviations': 0,
      // Too cumbersome
      'unicorn/no-keyword-prefix': 0,
      // No use
      'id-denylist': 0,
      'new-cap': 2,

      // Typecasting
      'no-extra-boolean-cast': [2, { enforceForInnerExpressions: true }],
      'no-implicit-coercion': [2, { disallowTemplateShorthand: true }],
      'unicorn/explicit-length-check': [2, { 'non-zero': 'not-equal' }],
      'unicorn/prefer-native-coercion-functions': 2,
      'no-new-wrappers': 2,
      'no-new-native-nonconstructor': 2,
      'unicorn/new-for-builtins': 2,
      'fp/no-valueof-field': 2,

      // Tests
      'no-unsafe-negation': [2, { enforceForOrderingRelations: true }],
      eqeqeq: [2, 'always', { null: 'ignore' }],
      // == null is sometimes a good shorthand
      'no-eq-null': 0,
      'unicorn/no-negation-in-equality-check': 2,
      'valid-typeof': 2,
      'unicorn/no-instanceof-array': 2,
      'no-negated-condition': 2,
      'unicorn/no-negated-condition': 2,
      'no-constant-condition': 2,
      'no-constant-binary-expression': 2,
      'no-self-compare': 2,
      'no-dupe-else-if': 2,
      yoda: 2,
      'no-nested-ternary': 2,
      // We allow ternaries, they can make code look cleaner
      'no-ternary': 0,
      'no-unneeded-ternary': [2, { defaultAssignment: false }],
      '@stylistic/js/multiline-ternary': [2, 'always-multiline'],
      'unicorn/prefer-ternary': 2,
      'unicorn/prefer-logical-operator-over-ternary': 2,

      // Structures
      'no-lone-blocks': 2,
      'no-lonely-if': 2,
      'unicorn/no-lonely-if': 2,
      'no-else-return': [2, { allowElseIf: false }],
      'no-unmodified-loop-condition': 2,
      'for-direction': 2,
      'unicorn/no-for-loop': 2,
      'guard-for-in': 2,
      'fp/no-loops': 2,

      // Switch
      'no-restricted-syntax': [
        2,
        'SwitchStatement',
        // This is added by eslint-config-prettier, so we keep it
        {
          selector: 'SequenceExpression',
          message:
            "The comma operator is confusing and a common mistake. Don't use it!",
        },
      ],
      'no-duplicate-case': 2,
      'default-case': 2,
      'default-case-last': 2,
      'no-fallthrough': 2,
      'no-case-declarations': 2,
      'unicorn/no-useless-switch-case': 2,
      'unicorn/prefer-switch': 2,
      'unicorn/switch-case-braces': 2,

      // Labels
      'no-labels': 2,
      'no-unused-labels': 2,
      'no-extra-label': 2,
      'no-label-var': 2,

      // Exceptions
      'no-throw-literal': 2,
      'unicorn/throw-new-error': 2,
      'unicorn/prefer-type-error': 2,
      'unicorn/error-message': 2,
      'unicorn/catch-error-name': [2, { ignore: ['cause'] }],
      'no-ex-assign': 2,
      'no-useless-catch': 2,
      'unicorn/prefer-optional-catch-binding': 2,
      'no-unsafe-finally': 2,
      'no-debugger': 2,
      // Too strict
      'fp/no-throw': 0,
      // Recommends `error.name` being enumerable, which is incorrect
      'unicorn/custom-error-definition': 0,

      // Functions
      'func-style': 2,
      'prefer-arrow-functions/prefer-arrow-functions': 2,
      'no-func-assign': 2,
      'func-names': [2, 'as-needed'],
      'func-name-matching': [2, { considerPropertyDescriptor: true }],
      'prefer-arrow-callback': [2, { allowNamedFunctions: true }],
      // This rule encourages creating functions where it is not needed
      'unicorn/no-array-callback-reference': 0,
      'arrow-body-style': 2,
      'unicorn/prefer-default-parameters': 2,
      'no-dupe-args': 2,
      'prefer-spread': 2,
      'unicorn/prefer-spread': 2,
      'unicorn/no-useless-spread': 2,
      'prefer-rest-params': 2,
      'fp/no-arguments': 2,
      // We want rest parameters to allow passing around arguments unchanged
      'fp/no-rest-parameters': 0,
      'require-yield': 2,
      'accessor-pairs': 2,
      'grouped-accessor-pairs': [2, 'getBeforeSet'],
      'getter-return': 2,
      'no-setter-return': 2,
      'fp/no-get-set': 2,
      'fp/no-proxy': 2,
      'no-useless-return': 2,
      // Too strict
      'consistent-return': 0,
      'unicorn/consistent-function-scoping': 2,
      'unicorn/prefer-reflect-apply': 2,

      // Objects
      'no-dupe-keys': 2,
      // We sort object keys by type, not by name
      'sort-keys': 0,
      'no-useless-computed-key': 2,
      'object-shorthand': 2,
      'no-useless-rename': 2,
      'unicorn/consistent-destructuring': 2,
      // It conflicts with `prefer-destructuring` rule
      'unicorn/no-unreadable-array-destructuring': 0,
      'no-empty-pattern': 2,
      'unicorn/no-object-as-default-parameter': 2,
      'no-object-constructor': 2,
      'no-unsafe-optional-chaining': [2, { disallowArithmeticOperators: true }],
      'prefer-object-has-own': 2,
      // Array.reduce() is sometimes useful in stateful logic
      'unicorn/prefer-object-from-entries': 0,

      // Inheritance
      'constructor-super': 2,
      'no-this-before-super': 2,
      'no-constructor-return': 2,
      'no-useless-call': 2,
      'no-extra-bind': 2,
      'consistent-this': 2,
      'unicorn/no-this-assignment': 2,
      'unicorn/no-static-only-class': 2,
      'no-empty-static-block': 2,
      // This forbids `func.bind()`
      'unicorn/prefer-prototype-methods': 0,
      'no-class-assign': 2,
      'no-proto': 2,
      'no-prototype-builtins': 2,
      'no-extend-native': 2,
      'no-unused-private-class-members': 2,
      'max-classes-per-file': 0,
      'fp/no-class': 2,
      'fp/no-this': 2,
      'unicorn/no-array-method-this-argument': 2,

      // Arrays
      'no-sparse-arrays': 2,
      'array-callback-return': [2, { allowImplicit: true, checkForEach: true }],
      'unicorn/prefer-includes': 2,
      'unicorn/prefer-array-flat-map': 2,
      'unicorn/prefer-array-flat': 2,
      'unicorn/no-magic-array-flat-depth': 2,
      // Array.reduce() is sometimes useful in stateful logic
      'unicorn/no-array-reduce': 0,
      'unicorn/prefer-negative-index': 2,
      'unicorn/no-length-as-slice-end': 2,
      'unicorn/prefer-array-find': 2,
      'unicorn/prefer-array-some': 2,
      'unicorn/prefer-array-index-of': 2,
      'unicorn/consistent-existence-index-check': 2,
      'unicorn/no-useless-length-check': 2,
      // We prefer `forEach()` over loops
      'unicorn/no-array-for-each': 0,
      'unicorn/no-array-push-push': 2,
      'unicorn/consistent-empty-array-spread': 2,
      // `Array.from()` is slower than `new Array()` followed by a `for` loop
      'unicorn/no-new-array': 0,
      'unicorn/prefer-set-has': 2,
      'unicorn/prefer-set-size': 2,
      'unicorn/require-array-join-separator': 2,

      // String
      'no-multi-str': 2,
      'no-useless-concat': 2,
      'prefer-template': 2,
      'no-template-curly-in-string': 2,
      'unicorn/prefer-string-starts-ends-with': 2,
      'unicorn/prefer-string-trim-start-end': 2,
      'unicorn/prefer-string-slice': 2,
      'unicorn/prefer-string-replace-all': 2,
      'unicorn/prefer-at': 2,
      'unicorn/no-hex-escape': 2,
      'unicorn/escape-case': 2,
      'unicorn/no-console-spaces': 2,
      // Not useful at the moment
      'unicorn/string-content': 0,
      'unicorn/prefer-code-point': 2,
      'unicorn/prefer-json-parse-buffer': 2,
      'unicorn/text-encoding-identifier-case': 2,

      // RegExps
      'no-useless-escape': 2,
      'unicorn/better-regex': 2,
      'no-control-regex': 2,
      // This is in conflict with no-useless-escape rule
      'no-div-regex': 0,
      'no-empty-character-class': 2,
      'no-regex-spaces': 2,
      'no-misleading-character-class': 2,
      'no-useless-backreference': 2,
      'no-invalid-regexp': 2,
      'prefer-regex-literals': [2, { disallowRedundantWrapping: true }],
      // Too verbose
      'unicorn/prefer-string-raw': 0,
      // TODO: use requireFlag 'v' after dropping Node <20.0.0
      'require-unicode-regexp': 2,
      // This makes RegExps more verbose
      'prefer-named-capture-group': 0,
      'unicorn/prefer-regexp-test': 2,

      // Number
      'unicorn/no-zero-fractions': 2,
      'unicorn/numeric-separators-style': 2,
      'no-octal': 2,
      'no-octal-escape': 2,
      'no-nonoctal-decimal-escape': 2,
      'prefer-numeric-literals': 2,
      radix: [2, 'as-needed'],
      'unicorn/prefer-number-properties': [2, { checkInfinity: true }],
      'use-isnan': [2, { enforceForIndexOf: true }],
      'no-compare-neg-zero': 2,
      'prefer-exponentiation-operator': 2,
      'no-bitwise': 2,
      'unicorn/prefer-math-trunc': 2,
      'unicorn/prefer-math-min-max': 2,
      'unicorn/prefer-modern-math-apis': 2,
      'unicorn/require-number-to-fixed-digits-argument': 2,

      // Symbol
      'symbol-description': 2,

      // Date
      'unicorn/prefer-date-now': 2,

      // Async
      'n/handle-callback-err': [2, '^(err|error)$'],
      'n/callback-return': 2,
      'n/no-callback-literal': 2,
      'no-promise-executor-return': 2,
      'unicorn/no-single-promise-in-promise-methods': 2,
      'unicorn/no-await-in-promise-methods': 2,
      'no-await-in-loop': 2,
      'unicorn/no-unnecessary-await': 2,
      'no-async-promise-executor': 2,
      'unicorn/no-useless-promise-resolve-reject': 2,
      'unicorn/prefer-top-level-await': 2,
      'unicorn/no-await-expression-member': 2,
      'unicorn/no-thenable': 2,
      'require-atomic-updates': 2,
      'n/no-sync': 2,
      'n/prefer-promises/fs': 2,
      'n/prefer-promises/dns': 2,
      'promise/catch-or-return': 2,
      'promise/always-return': 2,
      'promise/param-names': 2,
      'promise/valid-params': 2,
      'promise/no-new-statics': 2,
      // We want to allow Promise.all() and Promise.race()
      'promise/no-native': 0,
      'promise/no-return-wrap': 2,
      'promise/no-return-in-finally': 2,
      'promise/no-nesting': 2,
      'promise/no-promise-in-callback': 2,
      'promise/no-multiple-resolved': 2,
      'promise/no-callback-in-promise': 2,
      'promise/avoid-new': 2,
      'promise/prefer-await-to-then': [2, { strict: true }],
      'promise/prefer-await-to-callbacks': 2,
      'promise/spec-only': 2,

      // Modules
      'import/no-unresolved': [2, { ignore: ['@ehmicky/eslint-config'] }],
      'n/no-missing-require': 2,
      'n/no-unpublished-require': 2,
      'n/no-missing-import': [
        2,
        { allowModules: ['@ehmicky/eslint-config'], ignoreTypeImport: true },
      ],
      'n/no-unpublished-import': 2,
      // TODO: there are two bugs that make this rule hard to work with at the moment
      //  - https://github.com/microsoft/vscode-eslint/issues/717
      //  - when renaming a file, an error popup shows up in VSCode
      'import/no-unused-modules': 0,
      'import/named': 2,
      'import/default': 2,
      'import/namespace': [2, { allowComputed: true }],
      'import/no-named-as-default': 2,
      'import/no-named-as-default-member': 2,
      'unicorn/prefer-export-from': [2, { ignoreUsedVariables: true }],
      // All core Node.js libraries should be imported using destructuring
      'unicorn/import-style': [
        2,
        { styles: importStyles, extendDefaultStyles: false },
      ],
      'import/no-empty-named-blocks': 2,
      'import/no-namespace': 2,
      'import/no-named-default': 2,
      // This does not match our import/export style
      'import/no-named-export': 0,
      'import/prefer-default-export': 0,
      'import/no-anonymous-default-export': [
        2,
        { allowObject: true, allowArray: true, allowLiteral: true },
      ],
      // Better covered by `import/no-anonymous-default-export`
      'unicorn/no-anonymous-default-export': 0,
      'import/no-default-export': 2,
      'n/exports-style': [2, 'module.exports'],
      'n/no-exports-assign': 2,
      'no-import-assign': 2,
      'import/extensions': [2, 'always', { ignorePackages: true }],
      'n/file-extension-in-import': 2,
      'import/no-absolute-path': 2,
      // This does not work with the way we import files
      'import/no-internal-modules': 0,
      'import/no-relative-parent-imports': 0,
      'import/no-useless-path-segments': 2,
      'import/no-relative-packages': 2,
      'import/no-duplicates': 2,
      'import/export': 2,
      'import/no-self-import': 2,
      'import/no-cycle': 2,
      // This does not match our import/export style
      'import/group-exports': 0,
      // This does not allow excluding peerDependencies, so we only use
      // n/no-extraneous-import
      'import/no-extraneous-dependencies': 0,
      'n/no-extraneous-require': [2, { allowModules: ['ava', 'tsd'] }],
      'n/no-extraneous-import': [2, { allowModules: ['ava', 'tsd'] }],
      'import/first': 2,
      // This does not match our import/export style
      'import/exports-last': 0,
      'sort-imports': [
        2,
        { ignoreMemberSort: true, ignoreDeclarationSort: true },
      ],
      'n/no-mixed-requires': 2,
      'import/order': [
        2,
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          warnOnUnassignedImports: true,
          named: { enabled: true, types: 'types-last' },
        },
      ],
      'import/newline-after-import': 2,
      'import/unambiguous': 2,
      'n/global-require': 2,
      'n/no-new-require': 2,
      'import/no-dynamic-require': [2, { esmodule: true }],
      'import/no-commonjs': 2,
      'import/no-amd': 2,
      'unicorn/prefer-module': 2,
      'import/no-import-module-exports': 2,
      'import/no-deprecated': 2,
      'import/no-webpack-loader-syntax': 2,
      // No use
      'import/dynamic-import-chunkname': 0,
      // No use
      'import/no-restricted-paths': 0,
      // Prefer @typescript-eslint/consistent-type-imports
      'import/consistent-type-specifier-style': 0,
      'unicorn/prefer-node-protocol': 2,
      'n/prefer-node-protocol': 2,
      'unicorn/relative-url-style': 2,

      // Filenames
      // Setting options to eslint-plugin-filenames does not work with ESLint 9
      'filenames/match-regex': [2, '^[a-zA-Z_][a-zA-Z0-9_.]+$'],
      'filenames/match-exported': [2, 'snake'],
      'filenames/no-index': 2,
      'unicorn/filename-case': [2, { case: 'snakeCase' }],
      'unicorn/no-empty-file': 2,

      // Binary
      'n/no-unpublished-bin': 2,
      // We are symlinking shebang files so that they have the correct
      // file extension
      'n/hashbang': 0,

      // Compatibility
      // Does not work when transpiling with Babel
      'n/no-unsupported-features/es-syntax': 0,
      'n/no-unsupported-features/es-builtins': 0,
      'n/no-unsupported-features/node-builtins': 0,
      'n/no-unsupported-features/node-globals': 0,
      'n/no-deprecated-api': 2,
      'unicorn/no-unnecessary-polyfills': 2,
      'unicorn/prefer-global-this': 2,

      // Denylist
      // No use
      'no-restricted-exports': 0,
      // Already covered by no-restricted-imports
      'n/no-restricted-require': 0,
      'n/no-restricted-import': 0,
      // Rules for client-side code only
      'import/no-nodejs-modules': 0,
      // No use
      'no-restricted-properties': 0,
      // Avoid Node.js-specific global variables
      'no-restricted-globals': [
        2,
        ...forbiddenGlobals,
        // Use console wrapper instead
        'console',
      ],

      // To avoid
      'unicorn/no-null': 2,
      // `undefined` is too useful to avoid entirely
      'fp/no-nil': 0,
      'no-undefined': 0,
      'unicorn/no-useless-undefined': 2,
      'unicorn/no-typeof-undefined': 2,
      'no-void': 2,
      'no-with': 2,
      'no-caller': 2,
      'no-sequences': 2,
      'no-continue': 2,
      'no-iterator': 2,
      'no-console': 2,
      'fp/no-events': 2,
      'no-eval': 2,
      'no-new-func': 2,
      'no-buffer-constructor': 2,
      'unicorn/no-new-buffer': 2,
      'n/no-path-concat': 0,
      'n/no-process-env': 2,
      'n/no-process-exit': 2,
      'n/process-exit-as-throw': 2,
      'unicorn/no-process-exit': 2,
      'unicorn/prefer-structured-clone': 2,
      'unicorn/no-invalid-fetch-options': 2,
      'no-script-url': 2,
      'no-alert': 2,
      'unicorn/prefer-add-event-listener': 2,
      'unicorn/no-invalid-remove-event-listener': 2,
      'unicorn/prefer-event-target': 2,
      'no-obj-calls': 2,

      // DOM
      'unicorn/prefer-query-selector': 2,
      'unicorn/prefer-dom-node-append': 2,
      'unicorn/prefer-dom-node-remove': 2,
      'unicorn/prefer-dom-node-text-content': 2,
      'unicorn/prefer-keyboard-event-key': 2,
      'unicorn/prefer-dom-node-dataset': 2,
      'unicorn/prefer-modern-dom-apis': 2,
      'unicorn/no-document-cookie': 2,
      'unicorn/require-post-message-target-origin': 2,
      'unicorn/prefer-blob-reading-methods': 2,

      // Ava
      'ava/no-unknown-modifiers': 2,
      'ava/use-t-well': 2,
      'ava/no-todo-implementation': 2,
      'ava/no-nested-tests': 2,
      'ava/no-duplicate-modifiers': 2,
      'ava/assertion-arguments': [2, { message: 'never' }],
      'ava/test-title': 2,
      'ava/no-identical-title': 2,
      // Test titles do not follow any format
      'ava/test-title-format': 0,
      'ava/no-ignored-test-files': [
        2,
        { files: ['src/**/*.test.js', '!src/helpers/**/*.js'] },
      ],
      'ava/no-import-test-files': [
        2,
        { files: ['src/**/*.test.js', '!src/helpers/**/*.js'] },
      ],
      'ava/no-only-test': 2,
      'ava/no-skip-test': 2,
      'ava/no-skip-assert': 2,
      'ava/no-todo-test': 2,
      'ava/use-true-false': 2,
      'ava/prefer-t-regex': 2,
      // Do not use Power assert directly
      'ava/prefer-power-assert': 0,
      'ava/hooks-order': 2,
      'ava/no-inline-assertions': 2,
      'ava/max-asserts': [2, 5],
      'ava/no-incorrect-deep-equal': 2,
      'ava/use-t': 2,
      'ava/use-test': 2,
      'ava/prefer-async-await': 2,
      'ava/no-async-fn-without-await': 2,
      'ava/use-t-throws-async-well': 2,

      // React
      'react/*': 0,
    },
  },

  // Rules that apply to JavaScript but not to TypeScript.
  // Includes all rules which have an equivalent @typescript-eslint extension.
  {
    files: ['**/*.{js,cjs,mjs}'],
    rules: {
      ...javaScriptRules,

      // Modules
      'no-duplicate-imports': [2, { includeExports: true }],
    },
  },

  // TypeScript files
  {
    files: ['**/*.{ts,cts,mts}'],
    plugins: { '@typescript-eslint': typescriptEslint.plugin },
    languageOptions: { parser: typescriptEslint.parser },
    rules: {
      ...typeScriptRules,

      // Conflicts with Prettier
      '@stylistic/ts/member-delimiter-style': 0,
      '@stylistic/ts/object-curly-newline': 0,
      '@stylistic/ts/quote-props': 0,
      '@stylistic/ts/type-annotation-spacing': 0,
      '@stylistic/plus/type-generic-spacing': 0,
      '@stylistic/plus/type-named-tuple-spacing': 0,

      // Types requires more lines of code
      'max-lines': [2, { max: 120, skipBlankLines: true, skipComments: true }],

      // Ignore Type imports too
      'import/max-dependencies': [2, { ignoreTypeImports: true }],

      // Already fixed by other rules and does not seem to work rule with the
      // TypeScript setup
      'import/extensions': 0,

      // TypeScript already checks for missing imports.
      // Also this does not work when importing:
      //  - A `*.d.ts` without a sibling `.js`
      //  - The module itself, in `*.test-d.ts`
      'n/no-missing-import': 0,

      // Comments
      '@typescript-eslint/ban-ts-comment': 2,
      '@typescript-eslint/ban-tslint-comment': 2,

      // Declarations
      // Enforce declaring types of parameters.
      // Use type inference otherwise including for callbacks (arrow functions).
      '@typescript-eslint/typedef': [
        2,
        { parameter: true, propertyDeclaration: true },
      ],
      '@typescript-eslint/no-inferrable-types': 2,

      // Assignments
      '@typescript-eslint/no-dynamic-delete': 2,

      // Naming
      '@typescript-eslint/naming-convention': [
        2,
        {
          selector: 'default',
          // Variables of classes are titleized
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
      ],

      // Typecasting
      '@typescript-eslint/no-base-to-string': 2,
      // `${...}` is useful in validation error messages where input might be
      // unknown or of many different types
      '@typescript-eslint/restrict-template-expressions': 0,
      // Has a bug: considers that JSDoc comments are template expressions
      '@typescript-eslint/no-unnecessary-template-expression': 0,

      // Tests
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 2,
      '@typescript-eslint/no-unnecessary-condition': [
        2,
        { allowConstantLoopConditions: true, checkTypePredicates: true },
      ],
      '@typescript-eslint/strict-boolean-expressions': 2,
      // Application-specific ordering is more relevant than type-specific
      '@typescript-eslint/sort-type-constituents': 0,
      '@typescript-eslint/prefer-nullish-coalescing': [
        2,
        {
          ignoreTernaryTests: false,
          ignoreConditionalTests: false,
          ignoreMixedLogicalExpressions: false,
        },
      ],

      // Structures
      '@typescript-eslint/prefer-for-of': 2,
      '@typescript-eslint/no-for-in-array': 2,

      // Switch
      '@typescript-eslint/switch-exhaustiveness-check': [
        2,
        { requireDefaultForNonUnion: true },
      ],

      // Exceptions
      '@typescript-eslint/only-throw-error': 2,

      // Functions
      '@typescript-eslint/method-signature-style': 2,
      '@typescript-eslint/prefer-function-type': 2,
      '@typescript-eslint/no-unsafe-function-type': 2,
      // Prefer inferring return types instead
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/adjacent-overload-signatures': 2,
      // Overloading functions is a more readable alternative to generic types
      // in some cases
      '@typescript-eslint/unified-signatures': 0,

      // Objects
      '@typescript-eslint/consistent-type-definitions': 2,
      '@typescript-eslint/consistent-indexed-object-style': [
        2,
        'index-signature',
      ],
      '@typescript-eslint/no-empty-interface': 2,
      '@typescript-eslint/no-empty-object-type': 2,
      // Application-specific ordering is more relevant than type-specific
      '@typescript-eslint/member-ordering': 0,
      '@typescript-eslint/prefer-optional-chain': 2,

      // Classes
      '@typescript-eslint/unbound-method': 2,
      '@typescript-eslint/no-this-alias': 2,
      '@typescript-eslint/prefer-return-this-type': 2,
      '@typescript-eslint/explicit-member-accessibility': [
        2,
        { accessibility: 'no-public' },
      ],
      '@typescript-eslint/prefer-readonly': 2,
      '@typescript-eslint/class-literal-property-style': [2, 'fields'],
      '@typescript-eslint/parameter-properties': 2,
      '@typescript-eslint/no-unnecessary-parameter-property-assignment': 2,
      '@typescript-eslint/no-unsafe-declaration-merging': 2,
      '@typescript-eslint/no-extraneous-class': [
        2,
        {
          allowEmpty: true,
          allowWithDecorator: true,
          allowConstructorOnly: true,
        },
      ],
      '@typescript-eslint/no-misused-new': 2,

      // Arrays
      '@typescript-eslint/array-type': 2,
      '@typescript-eslint/prefer-find': 2,
      '@typescript-eslint/prefer-includes': 2,
      '@typescript-eslint/prefer-reduce-type-parameter': 2,
      '@typescript-eslint/require-array-sort-compare': [
        2,
        { ignoreStringArrays: true },
      ],

      // String
      '@typescript-eslint/restrict-plus-operands': 2,
      '@typescript-eslint/prefer-string-starts-ends-with': 2,

      // Number
      '@typescript-eslint/no-unsafe-unary-minus': 2,

      // RegExp
      '@typescript-eslint/prefer-regexp-exec': 2,

      // Async
      '@typescript-eslint/await-thenable': 2,
      '@typescript-eslint/no-misused-promises': 2,
      '@typescript-eslint/promise-function-async': 2,
      '@typescript-eslint/no-floating-promises': 2,
      '@typescript-eslint/return-await': 2,
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 2,

      // Modules
      '@typescript-eslint/consistent-type-exports': [
        2,
        { fixMixedExportsWithInlineTypeSpecifier: true },
      ],
      '@typescript-eslint/consistent-type-imports': [
        2,
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-import-type-side-effects': 2,
      '@typescript-eslint/no-require-imports': 2,
      '@typescript-eslint/no-useless-empty-export': 2,
      '@typescript-eslint/triple-slash-reference': [
        2,
        { lib: 'never', path: 'never', types: 'never' },
      ],

      // Forbid
      // Not currently useful
      '@typescript-eslint/no-restricted-types': 0,
      '@typescript-eslint/no-deprecated': 2,

      // Type declaration
      // `type` is useful
      '@typescript-eslint/no-redundant-type-constituents': 2,
      '@typescript-eslint/no-duplicate-type-constituents': 2,

      // Base types
      '@typescript-eslint/no-explicit-any': [2, { fixToUnknown: true }],
      '@typescript-eslint/no-unsafe-assignment': 2,
      '@typescript-eslint/no-unsafe-member-access': 2,
      '@typescript-eslint/no-unsafe-argument': 2,
      '@typescript-eslint/no-unsafe-call': 2,
      '@typescript-eslint/no-unsafe-return': 2,
      '@typescript-eslint/no-wrapper-object-types': 2,

      // Undefined/null/void
      // `value!` assertions are useful, e.g. when accessing an array element
      // that we know is not out-of-bound
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/non-nullable-type-assertion-style': 2,
      '@typescript-eslint/no-confusing-non-null-assertion': 2,
      '@typescript-eslint/no-extra-non-null-assertion': 2,
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 2,
      '@typescript-eslint/no-non-null-asserted-optional-chain': 2,
      '@typescript-eslint/no-invalid-void-type': [
        2,
        { allowAsThisParameter: true },
      ],
      '@typescript-eslint/no-confusing-void-expression': [
        2,
        { ignoreArrowShorthand: true, ignoreVoidOperator: true },
      ],
      '@typescript-eslint/no-meaningless-void-operator': 2,

      // Enums
      '@typescript-eslint/prefer-enum-initializers': 2,
      '@typescript-eslint/prefer-literal-enum-member': 2,
      '@typescript-eslint/no-duplicate-enum-values': 2,
      '@typescript-eslint/no-mixed-enums': 2,
      '@typescript-eslint/no-unnecessary-qualifier': 2,
      '@typescript-eslint/no-unsafe-enum-comparison': 2,

      // Readonly
      '@typescript-eslint/prefer-as-const': 2,
      // This rule seems to be buggy and produce false positives
      '@typescript-eslint/prefer-readonly-parameter-types': 0,

      // Generic
      '@typescript-eslint/consistent-generic-constructors': 2,
      '@typescript-eslint/no-unnecessary-type-arguments': 2,
      '@typescript-eslint/no-unnecessary-type-parameters': 2,
      '@typescript-eslint/no-unnecessary-type-constraint': 2,

      // Type assertions
      '@typescript-eslint/consistent-type-assertions': 2,
      '@typescript-eslint/no-unnecessary-type-assertion': 2,

      // Namespaces
      '@typescript-eslint/no-namespace': [2, { allowDefinitionFiles: false }],
      '@typescript-eslint/prefer-namespace-keyword': 2,
    },
  },

  // CommonJS files
  {
    files: ['**/*.{cjs,cts}'],
    rules: {
      'import/no-commonjs': 0,
      'import/unambiguous': 0,
    },
  },

  // Markdown files
  {
    files: ['**/*.md'],
    processor: 'markdown/markdown',
    language: 'markdown/gfm',
    // TODO: Those rules are currently ignored due to a bug
    // See https://github.com/eslint/markdown/issues/297
    rules: {
      'markdown/fenced-code-language': 2,
      'markdown/heading-increment': 2,
      'markdown/no-duplicate-headings': 2,
      'markdown/no-empty-links': 2,
      // We use HTML for <br/> and for the all-contributors table
      'markdown/no-html': 0,
      'markdown/no-invalid-label-refs': 2,
      'markdown/no-missing-label-refs': 2,
    },
  },

  {
    files: ['**/*.md/*.{js,ts}'],
    rules: {
      // We want to keep Markdown code examples short
      'import/newline-after-import': 0,

      // Markdown filenames do not match code examples
      camelcase: 0,
      'filenames/match-exported': 0,
      'filenames/match-regex': 0,
      'unicorn/filename-case': 0,

      // Code blocks sometimes used variables defined in previous ones
      'no-undef': 0,
    },
  },

  // Examples and documentation files
  {
    files: ['**/*.md/*.{js,ts}', 'examples/**/*.{js,cjs,mjs,ts,cts,mts}'],
    rules: {
      // Examples print their output at the end of the file
      // It might happen in documentation as well
      'no-console': 0,
      'no-restricted-globals': 0,

      // Inline comments can be nicer in documentation
      // Examples usually include the return value as inline comments
      '@stylistic/js/line-comment-position': 0,
      'no-inline-comments': 0,

      // Documentation often require the module itself.
      // Also documentation can require a module that does not exist.
      // Examples point to already built files which might not be created yet
      // if the user just cloned the repository
      'import/no-unresolved': 0,
      'import/no-extraneous-dependencies': 0,
      'n/no-missing-require': 0,
      'n/no-extraneous-require': 0,
      'n/no-extraneous-import': 0,
      'n/no-unpublished-require': 0,
      'n/no-missing-import': 0,

      // Examples sometimes use default exports
      'import/no-default-export': 0,
      'import/no-anonymous-default-export': 0,

      // Using those globals is simpler in documentation
      'n/prefer-global/buffer': 0,
      'n/prefer-global/process': 0,
      'n/prefer-global/url': 0,

      // Example test files
      'ava/no-ignored-test-files': 0,

      // Empty error messages are simpler in documentation
      'unicorn/error-message': 0,

      // Too verbose for documentation
      strict: 0,

      // Fixture files are sometimes executed by a CLI without exporting nor
      // importing anything
      'import/unambiguous': 0,

      // Sometimes useful in documentation
      'no-empty': 0,

      // Filenames do not always match in documentation
      'filenames/match-exported': 0,

      // Short variables can be useful in examples
      'id-length': 0,

      // Only useful runtime, not in documentation
      'symbol-description': 0,
    },
  },

  {
    files: ['**/*.html'],
    plugins: { html },
  },

  {
    files: ['**/*.md/*.js', 'examples/**/*.{js,cjs,mjs}'],
    rules: {
      // Inlining constants is simpler for examples
      'no-magic-numbers': 0,

      // Sometimes useful in documentation
      'no-empty-function': 0,

      // We allow asserts as they are simple
      'no-restricted-imports': 0,

      // `this` is sometimes omitting for example purpose
      'class-methods-use-this': 0,

      // Documentation and examples sometimes used unused variables
      'no-unused-vars': 0,
    },
  },

  {
    files: ['**/*.md/*.ts', 'examples/**/*.{ts,cts,mts}'],
    rules: {
      // Same rules as in JavaScript files
      '@typescript-eslint/no-magic-numbers': 0,
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-restricted-imports': 0,
      '@typescript-eslint/class-methods-use-this': 0,
      '@typescript-eslint/no-unused-vars': 0,

      // Documentation and examples might be using `any`
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/no-unsafe-call': 0,
      '@typescript-eslint/no-unsafe-return': 0,
    },
  },

  {
    files: ['**/*.md/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: false,
      },
    },
    // `eslint-config-markdown` does not work with `parserOptions.project`,
    // which removes some rules
    ...typescriptEslint.configs.disableTypeChecked,
  },

  // Test files, including helpers
  {
    files: ['src/**/*.test.{js,cjs,mjs,ts,cts,mts}'],
    rules: {
      // When using data-driven testing, an extra level of depth is implied
      // Also, test() creates a depth level as well
      'max-nested-callbacks': [2, 3],
      'max-lines-per-function': 0,

      // Self imports
      'import/no-unresolved': 0,
      'n/no-missing-import': 0,
      'n/no-extraneous-import': 0,

      // Empty functions can be useful in tests
      'no-empty': 0,

      // Often tested as an invalid input
      'unicorn/no-null': 0,

      // Empty error messages are simpler in tests
      'unicorn/error-message': 0,
    },
  },

  {
    files: ['src/**/*.test.{js,cjs,mjs}'],
    rules: {
      // Empty functions can be useful in tests
      'no-empty-function': 0,

      // Enforce integration testing
      'no-restricted-imports': [2, { patterns: [avoidAssert, avoidUnitTests] }],
    },
  },

  {
    files: ['src/**/*.test.{ts,cts,mts}'],
    rules: {
      // Same rules as in JavaScript files
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-restricted-imports': [
        2,
        { patterns: [avoidAssert, avoidUnitTests] },
      ],

      // Fix Ava linting with TypeScript files
      'ava/no-ignored-test-files': 0,
    },
  },

  // Test helpers and fixtures
  {
    files: ['src/helpers/**/*.{js,cjs,mjs}', 'src/fixtures/**/*.{js,cjs,mjs}'],
    rules: {
      // Allow including sibling files
      'no-restricted-imports': 0,
    },
  },

  {
    files: ['src/helpers/**/*.{ts,cts,mts}', 'src/fixtures/**/*.{ts,cts,mts}'],
    rules: {
      // Same rules as in JavaScript files
      '@typescript-eslint/no-restricted-imports': 0,
    },
  },

  // Test fixtures
  {
    files: ['src/fixtures/**/*.{js,cjs,mjs,ts,cts,mts}'],
    rules: {
      // Fixture files are sometimes executed by a CLI without exporting nor
      // importing anything
      'import/unambiguous': 0,
    },
  },

  // Files which require a default export
  {
    files: ['**/ava.config.js', '**/eslint.config.js', '**/prettier.config.js'],
    rules: {
      'import/no-anonymous-default-export': 0,
      'import/no-default-export': 0,
    },
  },

  // Gulpfile
  {
    files: ['**/gulpfile.js'],
    rules: {
      'import/no-unresolved': 0,
      'n/no-missing-import': 0,
      'n/no-extraneous-import': 0,
      'n/no-unpublished-import': 0,
    },
  },

  // Gulpfile and gulp tasks
  {
    files: ['**/gulpfile.js', 'gulp/**/*.{js,cjs,mjs,ts,cts,mts}'],
    rules: {
      // Gulp tasks sometimes print to console
      'no-console': 0,
      'no-restricted-globals': [2, ...forbiddenGlobals],
      'fp/no-mutation': [
        2,
        {
          commonjs: true,
          exceptions: [...mutableProperties, { property: 'description' }],
        },
      ],
    },
  },

  // Main JavaScript entry point
  {
    files: ['src/main.{js,ts,d.ts}'],
    rules: {
      'filenames/match-exported': 0,
      'import/no-default-export': 0,
    },
  },

  // Main TypeScript entry point
  {
    files: ['src/main.{ts,d.ts}'],

    rules: {
      // Allow overloaded main exports
      'import/export': 0,
    },
  },

  // CLI
  {
    files: [
      'src/bin/**/*.{js,cjs,mjs,ts,cts,mts}',
      'src/bin.{js,cjs,mjs,ts,cts,mts}',
    ],
    rules: {
      // CLI often prints to console
      'no-console': 0,
      'no-restricted-globals': [2, ...forbiddenGlobals],

      // CLI often forwards to main commands using `import * as commands`
      'import/no-namespace': 0,
    },
  },

  // Benchmark files
  {
    files: ['benchmark/**/*.{js,cjs,mjs,ts,cts,mts}'],
    rules: {
      // Often used to signify number of iterations
      'filenames/no-index': 0,

      // Self imports
      'import/no-unresolved': 0,
      'n/no-missing-import': 0,
      'n/no-extraneous-import': 0,
    },
  },

  {
    files: ['benchmark/**/*.{js,cjs,mjs}'],
    rules: {
      // Often used to signify number of iterations
      'no-magic-numbers': 0,

      // Unused expressions are useful in benchmarks
      'no-unused-expressions': 0,
    },
  },

  {
    files: ['benchmark/**/*.{ts,cts,mts}'],
    rules: {
      // Same rules as in JavaScript files
      '@typescript-eslint/no-magic-numbers': 0,
      '@typescript-eslint/no-unused-expressions': 0,
    },
  },

  // Type tests
  {
    files: ['**/*.test-d.ts'],
    rules: {
      // Unused expressions and arguments are useful in type tests
      'no-new': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],

      // Unusual names, functions or methods or are useful in type tests
      'class-methods-use-this': 0,
      'id-length': 0,
      '@typescript-eslint/no-useless-constructor': 0,
      '@typescript-eslint/no-empty-function': 0,

      // Allow testing callbacks
      'n/handle-callback-err': 0,
      'promise/prefer-await-to-callbacks': 0,

      // `test-d` is dasherized, but rest must use underscores
      'filenames/match-regex': [2, '^[a-zA-Z_][a-zA-Z0-9_.]+\\.test-d\\.ts$'],
      'unicorn/filename-case': [
        2,
        {
          case: 'snakeCase',
          ignore: ['^[a-zA-Z_][a-zA-Z0-9_.]+\\.test-d\\.ts$'],
        },
      ],

      // Passing `undefined` is handled differently than passing no argument by
      // TypeScript, which can be tested
      'unicorn/no-useless-undefined': 0,

      // Empty error messages are simpler in tests
      'unicorn/error-message': 0,

      // Often tested as an invalid input
      'unicorn/no-null': 0,

      // @ts-expect-error is useful in type tests
      '@typescript-eslint/ban-ts-comment': [2, { 'ts-expect-error': false }],

      // Allow using `expectType<void>(...)`
      '@typescript-eslint/no-invalid-void-type': 0,
      '@typescript-eslint/no-confusing-void-expression': 0,

      // `this` is sometimes omitting for example purpose
      '@typescript-eslint/class-methods-use-this': 0,
    },
  },

  // Files that are sibling to a `*.js` or `*.ts`
  {
    files: ['**/*.{test.{js,cjs,mjs,ts,cts,mts},d.ts,test-d.ts}'],
    rules: {
      // Each source file should have a single sibling test file, regardless of
      // its size
      'max-lines': 0,
    },
  },
]
/* eslint-enable id-length, max-lines, no-magic-numbers,
   import/max-dependencies */
