import test from 'ava'
import execa from 'execa'

const ESLINT_CONFIG = `${__dirname}/../../.eslintrc.yml`
const TEST_FILE = `${__dirname}/../../test/helpers/valid.js`

test('Smoke test', async (t) => {
  const { exitCode, stdout, stderr } = await execa(
    'eslint',
    [TEST_FILE, '--config', ESLINT_CONFIG],
    { preferLocal: true },
  )
  t.snapshot({ exitCode, stdout, stderr })
})
