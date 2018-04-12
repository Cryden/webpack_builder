let FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = favicons => {
  return {
    plugins: [
      new FaviconsWebpackPlugin({
        logo: './source/images/icons/logo 512x512.png',
        prefix: './images/icons/'
      })
    ]
  }
}
