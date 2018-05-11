const WebpackBar = require('webpackbar')

module.exports = bar => {
  return {
    plugins: [
      new WebpackBar({
        name: 'FROND',
        profile: true,
        compiledIn: true
      })
    ]
  }
}
