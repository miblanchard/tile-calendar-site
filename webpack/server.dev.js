const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./server.common.js');

module.exports = merge(common, {
  mode: 'development',
  // plugins: [
    
  // ]
});
