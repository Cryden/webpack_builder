const path = require('path')
const merge = require('webpack-merge')
let taskspath = path.resolve('webpack/tasks/')
const tasks = require('require-all')(taskspath)
let optionspath = path.resolve('webpack/options/')
const options = require('require-all')(optionspath)

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let common = {
  entry: {
    index: './source/js/index.js'
  },
  output: {
    path: path.resolve('app/client'),
    filename: 'js/[name].bundle.[hash].js'
  },
  performance: {
    hints: false
  },
  stats: 'errors-only',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template using Pug',
      template: './source/pug/index.pug',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      {from: 'source/images', to: 'images'}
    ])
  ]
}

module.exports = merge([
  common,
  options.livereload(),
  options.notify(),
  options.bar(),
  tasks.images(),
  tasks.babeljs(),
  tasks.fonts(),
  tasks.pug(),
  tasks.css(),
  tasks.sass(),
  tasks.vue(),
  tasks.extractStyles(),
  tasks.favicons()
])
