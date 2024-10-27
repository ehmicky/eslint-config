import { fileURLToPath } from 'node:url'

import test from 'ava'
import spawn from 'nano-spawn'

const ESLINT_CONFIG = fileURLToPath(
  new URL('../../eslint.config.js', import.meta.url),
)
const FIXTURE_FILE = fileURLToPath(
  new URL('../../src/fixtures/valid.test.js', import.meta.url),
)

test('Smoke test', async (t) => {
  const { exitCode, stdout, stderr } = await spawn(
    'eslint',
    [FIXTURE_FILE, '--config', ESLINT_CONFIG],
    { preferLocal: true },
  )

  t.is(exitCode, undefined)
  t.is(stdout, '')
  t.is(stderr, '')
})
