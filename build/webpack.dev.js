const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3333,
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3334',
        changeOrigin: true,
        secure: false
      }
    },
  },
  plugins: []
});
