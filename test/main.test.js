// eslint-disable-next-line ava/no-ignored-test-files
import { fileURLToPath } from 'node:url'

// eslint-disable-next-line import/no-unresolved
import test from 'ava'
import { execa } from 'execa'

const ESLINT_CONFIG = fileURLToPath(
  new URL('../../.eslintrc.yml', import.meta.url),
)
const TEST_FILE = fileURLToPath(
  new URL('../../test/helpers/valid.test.js', import.meta.url),
)

test('Smoke test', async (t) => {
  const { exitCode, stdout, stderr } = await execa(
    'eslint',
    [TEST_FILE, '--config', ESLINT_CONFIG],
    { preferLocal: true },
  )
  t.snapshot({ exitCode, stdout, stderr })
})
