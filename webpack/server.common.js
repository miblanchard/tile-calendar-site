const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, '..', 'src/', 'server/', 'index.js'),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../'),
    filename: 'server.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: [
          path.resolve(__dirname, '..', 'src', 'server'),
          path.resolve(__dirname, '..', 'src', 'shared')
        ],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false'
    })
  ]
};
