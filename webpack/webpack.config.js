const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackCriticalPlugin = require('html-webpack-critical-plugin')

module.exports = {
  entry: './source/js/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'js/index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
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
  },
  plugins: [
    new WebpackNotifierPlugin({
      title: 'FROND',
      contentImage: path.resolve('assets', 'logo-square.png'),
      alwaysNotify: true
    }),
    new HtmlWebpackCriticalPlugin(),
    new HtmlWebpackPlugin({
      title: 'Custom template using Pug',
      template: './source/pug/index.pug'
    }),
    new HtmlBeautifyPlugin(),
    new ExtractTextPlugin({
      filename: 'css/styles.[hash].css'
    })
  ],
  devServer: {
    contentBase: path.resolve('dist'),
    compress: true,
    port: 9000
  }
}
