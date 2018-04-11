/* global ExtractTextPlugin */

module.exports = vue => {
  return {
    module: {
      rules: [
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
        }
      ]
    },
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    }
  }
}
