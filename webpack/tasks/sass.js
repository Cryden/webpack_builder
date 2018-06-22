/* global ExtractTextPlugin */

module.exports = sass => {
  return {
    module: {
      rules: [
        {
          test: /\.sass$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader'
            }, {
              loader: 'group-css-media-queries-loader'
            }, {
              loader: 'sass-loader'
            }],
            fallback: 'style-loader'
          })
        }
      ]
    }
  }
}
