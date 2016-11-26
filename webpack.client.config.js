var webpack = require('webpack');
var __STATIC_ASSETS_CDN__ = process.env.STATIC_ASSETS_CDN || 'http://localhost:8080';
module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './src/client'
  },
  output: {
    path: __dirname + '/build/www',
    publicPath: '/',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify('production'),
      __SERVER__: false,
    })
  ],
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        loaders: ['style', 'css', 'sass?sourceMap']
      },
      {
        test: /\.styl$/,
        loaders: ['style', 'css', 'stylus']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        loaders: ['url?limit=100000']
      },
      {
        test: /\.(ttf|woff2?|eot)$/,
        loaders: ['file']
      },
      {

        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          babelrc: false,
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ["transform-async-to-generator"]
        }
      }
    ]
  }
};
