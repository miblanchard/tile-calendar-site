const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./client.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
