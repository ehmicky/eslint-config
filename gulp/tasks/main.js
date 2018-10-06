'use strict'

const { series } = require('gulp')

const { build } = require('./build')

const defaultTask = series(build)

// eslint-disable-next-line fp/no-mutation
defaultTask.description = 'Build the application'

module.exports = {
  default: defaultTask,
}
