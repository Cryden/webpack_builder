const ImageminPlugin = require('imagemin-webpack-plugin').default
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = images => {
  return {
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8000,
                name: '[name].[ext]',
                outputPath: 'images/',
                publicPath: './../images/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
      new CopyWebpackPlugin([
        {from: 'source/images', to: 'images'}
      ])
    ]
  }
}
