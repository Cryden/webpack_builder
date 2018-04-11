const path = require('path')
const merge = require('webpack-merge')
let taskspath = path.resolve('webpack/tasks/')
const tasks = require('require-all')(taskspath)
let optionspath = path.resolve('webpack/options/')
const options = require('require-all')(optionspath)

const HtmlWebpackPlugin = require('html-webpack-plugin')

let common = {
  entry: './source/js/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'js/index.bundle.[hash].js'
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template using Pug',
      template: './source/pug/index.pug'
    })
  ]
}

module.exports = merge([
  common,
  options.livereload(),
  options.notify(),
  tasks.images(),
  tasks.babeljs(),
  tasks.fonts(),
  tasks.pug(),
  tasks.sass(),
  tasks.vue(),
  tasks.extractStyles()
])
