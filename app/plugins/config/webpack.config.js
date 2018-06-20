const path = require('path')
const merge = require('webpack-merge')
// let taskspath = path.resolve('frond/tasks/')
// const tasks = require('require-all')(taskspath)
// let optionspath = path.resolve('webpack/options/')
// const options = require('require-all')(optionspath)

let common = {
  entry: {
    index: './source/js/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].bundle.[hash].js'
  },
  plugins: [
  ]
}

module.exports = merge([
  common
])
