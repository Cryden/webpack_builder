const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let files = []
let dirFiles = fs.readdirSync(path.join('source/pug'))

for (let i = 0; i < dirFiles.length; i++) {
  if (dirFiles[i].endsWith('.pug')) {
    let keyName = dirFiles[i].substring(0, dirFiles[i].length - '.yml'.length)
    files[keyName] = path.join('source/pug', dirFiles[i])
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

module.exports = pug => {
  return {
    module: {
      rules: [
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                attrs: ['img:src']
              }
            },
            {
              loader: 'pug-plain-loader'
            }
          ]
        }
      ]
    },
    plugins: HtmlWebpackPluginArray
  }
}
