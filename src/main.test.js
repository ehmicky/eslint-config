import { fileURLToPath } from 'node:url'

import test from 'ava'
import { execa } from 'execa'

const ESLINT_CONFIG = fileURLToPath(
  new URL('../../.eslintrc.yml', import.meta.url),
)
const FIXTURE_FILE = fileURLToPath(
  new URL('../../src/fixtures/valid.test.js', import.meta.url),
)

// eslint-disable-next-line ava/no-skip-test
test.skip('Smoke test', async (t) => {
  const { exitCode, stdout, stderr } = await execa(
    'eslint',
    [FIXTURE_FILE, '--config', ESLINT_CONFIG],
    { preferLocal: true },
  )
  t.is(exitCode, 0)
  t.is(stdout, '')
  t.is(stderr, '')
})

test('Download speed', async (t) => {
  const nodes = [
    {
      name: 'nodejs.org/dist Linux',
      url: 'https://nodejs.org/dist/v20.7.0/node-v20.7.0-linux-x64.tar.gz',
    },
    {
      name: 'nodejs.org/dist macOS',
      url: 'https://nodejs.org/dist/v20.7.0/node-v20.7.0-darwin-x64.tar.gz',
    },
    {
      name: 'nodejs.org/dist Windows',
      url: 'https://nodejs.org/dist/v20.7.0/node-v20.7.0-win-x64.7z',
    },
    {
      name: 'GitHub Linux',
      url: 'https://github.com/actions/node-versions/releases/download/20.7.0-6231175880/node-20.7.0-linux-x64.tar.gz',
    },
    {
      name: 'GitHub macOS',
      url: 'https://github.com/actions/node-versions/releases/download/20.7.0-6231175880/node-20.7.0-darwin-x64.tar.gz',
    },
    {
      name: 'GitHub Windows',
      url: 'https://github.com/actions/node-versions/releases/download/20.7.0-6231175880/node-20.7.0-win32-x64.7z',
    },
  ]

  // eslint-disable-next-line fp/no-loops
  for (const node of nodes) {
    // eslint-disable-next-line no-console, no-restricted-globals
    console.time(`${node.name} total`)

    // eslint-disable-next-line fp/no-loops, fp/no-mutation, fp/no-let, max-depth
    for (let index = 0; index < 10; index += 1) {
      // eslint-disable-next-line no-console, no-restricted-globals
      console.time(node.name)
      // eslint-disable-next-line no-await-in-loop
      await fetch(node.url)
      // eslint-disable-next-line no-console, no-restricted-globals
      console.timeEnd(node.name)
    }

    // eslint-disable-next-line no-console, no-restricted-globals
    console.timeEnd(`${node.name} total`)
  }

  t.pass()
})
