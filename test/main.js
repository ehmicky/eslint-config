import test from 'ava'
import execa from 'execa'

const ESLINT_CONFIG = new URL('../../.eslintrc.yml', import.meta.url).pathname
const TEST_FILE = new URL('../../test/helpers/valid.js', import.meta.url)
  .pathname

test('Smoke test', async (t) => {
  const { exitCode, stdout, stderr } = await execa(
    'eslint',
    [TEST_FILE, '--config', ESLINT_CONFIG],
    { preferLocal: true },
  )
  t.snapshot({ exitCode, stdout, stderr })
})
