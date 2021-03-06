module.exports = fonts => {
  return {
    module: {
      rules: [
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          exclude: /(images)/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: './../fonts/'
            }
          }]
        }
      ]
    }
  }
}
