const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = Object.assign({
  context: path.join(__dirname, 'app'),
  entry: {
    main: './index',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'prop-types',
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendors.js',
      minChunks: Infinity,
    }),
    new ExtractTextPlugin('style.css'),
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
        ]
      }),
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve('app'),
      path.resolve('node_modules'),
    ],
  }
}, process.env.NODE_ENV === 'development' ? {
  devtool: 'inline-souce-map',
} : {});
