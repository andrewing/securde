const micromatch = require('micromatch')

module.exports = {
  '**/*.js?(x)': files => {
    const match = micromatch.not(files, '*lambda/*.js')
    return `eslint ${match.join(' ')}`
  }
}