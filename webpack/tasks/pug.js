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
    }
  }
}
