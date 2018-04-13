module.exports = images => {
  return {
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: 'img-loader'
            },
            {
              loader: 'url-loader',
              options: {
                limit: 8000,
                name: '[name].[ext]',
                outputPath: 'images/',
                publicPath: 'images'
              }
            }
          ]
        }
      ]
    }
  }
}
