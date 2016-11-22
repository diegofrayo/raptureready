var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: path.join(__dirname, 'start-server')
  },
  target: 'node',
  output: {
    path: path.join(__dirname, '.tmp'),
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
    new webpack.IgnorePlugin(/vertx/)
  ],
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
