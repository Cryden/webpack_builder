const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let files = []
let dirFiles = fs.readdirSync(path.join('source/html'))

for (let i = 0; i < dirFiles.length; i++) {
  if (dirFiles[i].endsWith('.html')) {
    let keyName = dirFiles[i].substring(0, dirFiles[i].length - '.html'.length)
    files[keyName] = path.join('html', dirFiles[i])
  }
}

let HtmlWebpackPluginArray = []

for (var keyName in files) {
  if (files.hasOwnProperty(keyName)) {
    let HtmlWebpackPluginValue = new HtmlWebpackPlugin({
      template: files[keyName],
      filename: keyName + '.html'
    })
    HtmlWebpackPluginArray.push(HtmlWebpackPluginValue)
  }
}

module.exports = html => {
  return {
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                attrs: ['img:src']
              }
            }
          ]
        }
      ]
    },
    plugins: HtmlWebpackPluginArray
  }
}