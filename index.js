/* eslint-disable */

global.__SERVER__ = true;
require('babel-register');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');

var appPort = 1337;
var proxy = 'http://localhost:' + appPort;

var devServer = new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, '.tmp'),
  publicPath: '/public/',
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

devServer.listen(3000, 'localhost', function () {
  console.log('Listening at http://%s:%s', 'localhost', 3000);
});

var app = require('./src/server').default;
app.listen(appPort, function () {});
