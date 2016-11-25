var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: path.join(__dirname, 'src', 'client')
  },
  output: {
    path: path.join(__dirname, '.tmp'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        loaders: ['url?limit=100000']
      },
      {
        test: /\.(ttf|woff|eot)$/,
        loaders: ['file']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          babelrc: false,
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
};
