var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: path.join(__dirname, 'src', 'client')
  },
  target: 'node',
  output: {
    path: path.join(__dirname, '.tmp'),
    filename: 'server-bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      __SERVER__: true,
    })
  ],
  module: {
    loaders: [
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

        test: /\.jsx?$/,
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
