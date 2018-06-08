const webpack = require('webpack')

const webpackConfig = require('./../webpack/webpack.config')

webpack([
  webpackConfig,
  {mode: 'development'}
], (err, stats) => {
  if (err || stats.hasErrors()) {
    // Handle errors here
  }
  // Done processing
})
