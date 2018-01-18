var path = require('path');
var webpack = require('webpack');

var config = {
  context: __dirname, //refers to the root of the project folder
  entry: './play.js', //imports fro,
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '*'],
  },
  devtool: 'source-map',
};

module.exports = config;
