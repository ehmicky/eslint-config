'use strict'

module.exports = {
  extends: [`${__dirname}/.eslintrc.json`],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'import/no-anonymous-default-export': 2,
    'import/extensions': [2, 'ignorePackages'],
    'global-require': 2,
    'import/no-commonjs': 2,
    'filenames/no-index': 2,

    'ava/no-ignored-test-files': [
      2,
      { files: ['test/**/*.js', '!test/helpers/**/*.js'] },
    ],
    'ava/no-import-test-files': [
      2,
      { files: ['test/**/*.js', '!test/helpers/**/*.js'] },
    ],

    // This does not match our import/export style
    'import/prefer-default-export': 0,
    'import/group-exports': 0,
    'import/exports-last': 0,
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
      files: ['gulpfile.js', '.eslintrc.js', '.prettierrc.js'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        'import/no-commonjs': 0,
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
