'use strict'

module.exports = {
  extends: [`${__dirname}/.eslintrc.json`],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'ava/no-ignored-test-files': [
      2,
      {
        files: ['test/**/*.js', '!test/helpers/**/*.js'],
      },
    ],
    'ava/no-import-test-files': [
      2,
      {
        files: ['test/**/*.js', '!test/helpers/**/*.js'],
      },
    ],

    // This does not match our import/export style
    'import/group-exports': 0,
    'import/extensions': [2, 'ignorePackages'],
    'unicorn/import-index': 0,
  },
  overrides: [
    {
      files: ['*.md', '**/*.md'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['ava.config.js'],
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      files: ['gulpfile.js'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['examples/**/*.js'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
}
