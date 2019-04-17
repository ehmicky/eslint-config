'use strict'

// We specify all options to avoid them being overridden
// We use JavaScript instead of JSON or YAML so that this file can be exported
// as the package's main file. We need to do that so it can be a shareable
// configuration.
module.exports = {
  // Same as .editorconfig (and also default values)
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,

  // Same as default values
  quoteProps: 'as-needed',
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'avoid',
  htmlWhitespaceSensitivity: 'css',

  // Different from default values
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  loglevel: 'warn',
  proseWrap: 'always',
}
