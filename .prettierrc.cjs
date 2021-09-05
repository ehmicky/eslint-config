// We specify all options to avoid them being overridden
// We use JavaScript instead of JSON or YAML so that this file can be exported
// as the package's main file. We need to do that so it can be a shareable
// configuration.
// Prettier config file does not support ES modules yet.
module.exports = {
  // Same as .editorconfig (and also default values)
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,

  // Same as default values
  quoteProps: 'as-needed',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'css',

  // Same as default values and same as .editorconfig
  // `.gitattributes` with `* text=auto eol=lf` is also needed to prevent
  // Git from using CRLF on Windows.
  endOfLine: 'lf',

  // Different from default values
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  proseWrap: 'always',
}
