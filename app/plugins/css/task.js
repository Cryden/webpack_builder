/* global ExtractTextPlugin */

module.exports = css => {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader'
            }],
            fallback: 'style-loader'
          })
        }
      ]
    }
  }
}
