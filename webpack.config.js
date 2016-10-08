var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: [
    'babel-polyfill',
    APP_DIR + '/app.jsx'
  ],
  output: {
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      { test : /\.jsx?/, include : APP_DIR, loader : 'babel' }
    ]
  }
};

module.exports = config;
