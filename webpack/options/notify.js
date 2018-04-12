const WebpackNotifierPlugin = require('webpack-notifier')
const path = require('path')

module.exports = notify => {
  return {
    plugins: [
      new WebpackNotifierPlugin({
        title: 'FROND',
        contentImage: path.resolve('assets', 'logo-square.png'),
        alwaysNotify: true
      })
    ]
  }
}
