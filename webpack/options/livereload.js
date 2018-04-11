const path = require('path')

module.exports = livereload => {
  return {
    devServer: {
      contentBase: path.resolve('dist'),
      compress: true,
      port: 9000
    }
  }
}
