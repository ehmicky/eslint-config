'use strict'

const test = require('ava')
const execa = require('execa')

const ESLINT_CONFIG = `${__dirname}/../src/.eslintrc.json`
const TEST_FILE = `${__dirname}/../../test/helpers/valid.js`

test('Smoke test', async t => {
  const { code, stdout, stderr } = await execa('eslint', [
    TEST_FILE,
    '--config',
    ESLINT_CONFIG,
  ])
  t.snapshot({ code, stdout, stderr })
})
