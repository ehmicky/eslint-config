import { fileURLToPath } from 'node:url'

import test from 'ava'
import { execa } from 'execa'

const ESLINT_CONFIG = fileURLToPath(
  new URL('../../.eslintrc.yml', import.meta.url),
)
const FIXTURE_FILE = fileURLToPath(
  new URL('../../src/fixtures/valid.test.js', import.meta.url),
)

test('Smoke test', async (t) => {
  const { exitCode, stdout, stderr } = await execa(
    'eslint',
    [FIXTURE_FILE, '--config', ESLINT_CONFIG],
    { preferLocal: true },
  )

  t.is(exitCode, 0)
  t.is(stdout, '')
  t.is(stderr, '')
})
