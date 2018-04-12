const path = require('path')
const merge = require('webpack-merge')
let taskspath = path.resolve('webpack/tasks/')
const tasks = require('require-all')(taskspath)
let optionspath = path.resolve('webpack/options/')
const options = require('require-all')(optionspath)

const HtmlWebpackPlugin = require('html-webpack-plugin')

let common = {
  entry: {
    index: './source/js/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].bundle.[hash].js'
  },
  performance: {
    hints: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template using Pug',
      template: './source/pug/index.pug'
    })
  ],
  stats: {
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  }
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
  tasks.extractStyles(),
  tasks.favicons()
])
