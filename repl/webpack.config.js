const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve('output'),
    filename: 'index.js'
  },
  target: 'web',
  devtool: '#inline-source-map',
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
