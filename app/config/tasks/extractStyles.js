/* global ExtractTextPlugin */

global.ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = extractStyles => {
  return {
    plugins: [
      new ExtractTextPlugin({
        filename: 'css/styles.[hash].css'
      })
    ]
  }
}
