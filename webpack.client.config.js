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
      __webpack_public_path__: JSON.stringify(__STATIC_ASSETS_CDN__ + '/'),
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
        loaders: ['url?limit=1']
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
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
