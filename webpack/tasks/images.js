module.exports = images => {
  return {
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: 'img-loader',
              options: {
                enable: true,
                gifsicle: {
                  interlaced: false
                },
                mozjpeg: {
                  progressive: true,
                  arithmetic: false
                },
                optipng: false,
                pngquant: {
                  floyd: 0.5,
                  speed: 2
                },
                svgo: {
                  plugins: [
                    { removeTitle: true },
                    { convertPathData: false }
                  ]
                }
              }
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
