/* eslint-disable */

global.__SERVER__ = true;
require('babel-register');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.client.config');
var path = require('path');

var appPort = 1337;
var WebpackDevServerPort = process.env.WEB_PORT || 3000;
var proxy = 'http://localhost:' + appPort;

var devServer = new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, '.tmp'),
  publicPath: '/www/',
  hot: true,
  historyApiFallback: true,
  proxy: {
    "/": {
      target: proxy,
      secure: false,
      prependPath: false
    }
  }
});

devServer.listen(WebpackDevServerPort, 'localhost', function () {
  console.log('Listening at http://%s:%s', 'localhost', 3000);
});


