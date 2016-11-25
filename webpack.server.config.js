// var path = require('path');
var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './start-server'
  },
  target: 'node',
  output: {
    path: 'build',
    filename: 'server-bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.es6', '.babel', '.node' ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      __SERVER__: true,
      "process.browser": JSON.stringify(true)
    }),
    new webpack.IgnorePlugin(/vertx/),
    new CopyWebpackPlugin(
      [
        { from: 'src/server/www', to: 'www' },
        { from: 'Procfile'},
        { from: 'package.json'}
      ], 
      {ignore: ['.gitkeep'], copyUnmodified: true}
    )
  ],
  externals: [nodeExternals({whitelist: [/\.s?css$/]})], // in order to ignore all modules in node_modules folder
  module: {
    loaders: [
      { test: /\.node$/, loader: 'node' },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.s?css$/,
        loaders: ['null-loader']
      },
      {
        test: /\.styl$/,
        loaders: ['null-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        loaders: ['null-loader']
      },
      {
        test: /\.(ttf|woff|eot)$/,
        loaders: ['null-loader']
      },
      {

        test: /\.(jsx?|es6|babel)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          babelrc: false,
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            ['transform-runtime', {
              'polyfill': false,
              'regenerator': true
            }]
          ]
        }
      }
    ]
  }
};
