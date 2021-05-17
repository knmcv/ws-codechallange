var path = require('path');
var webpack = require('webpack');
module.exports = {
  mode: "development",
  entry: {
    products: './js/products.js'
  },
  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: 'products.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  stats: 'verbose',
  devtool: 'source-map'
};
