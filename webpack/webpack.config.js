const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackCriticalPlugin = require('html-webpack-critical-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  entry: './source/js/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'js/index.bundle.[hash].js'
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
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            }),
            sass: ExtractTextPlugin.extract({
              use: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
              fallback: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader'
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
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
      },
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
  performance: {
    hints: false
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
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
    }),
    new CopyWebpackPlugin([
      {from: 'source/images', to: 'images'}
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
  ],
  devServer: {
    contentBase: path.resolve('dist'),
    compress: true,
    port: 9000
  }
}
