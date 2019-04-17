'use strict'

// We specify all options to avoid them being overridden
// We use JavaScript instead of JSON or YAML so that this file can be exported
// as the package's main file. We need to do that so it can be a shareable
// configuration.
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  loglevel: 'warn',
}
