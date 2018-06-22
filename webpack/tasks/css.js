/* global ExtractTextPlugin */

module.exports = css => {
  return {
    module: {
      rules: [
        {
          test: /\.(css)$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader'
            }, {
              loader: 'group-css-media-queries-loader'
            }],
            fallback: 'style-loader'
          })
        }
      ]
    }
  }
}
