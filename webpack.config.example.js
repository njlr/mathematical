const path = require('path');

module.exports = {
  entry: './example.js',
  output: {
    path: path.resolve('output'),
    filename: 'example.js'
  },
  target: "node",
  devtool: "#inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          babelrc: true
        }
      }
    ]
  }
};
