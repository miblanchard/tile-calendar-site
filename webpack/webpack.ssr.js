const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const browserConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, '..', 'src/', 'client/', 'index.js'),
  output: {
    path: path.resolve(__dirname, '..', 'src/', 'build'),
    publicPath: '/build',
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '..', 'src', 'client'),
          path.resolve(__dirname, '..', 'src', 'shared')
        ],
        use: [
          'babel-loader',
        ]
      },
      {
        test: /\.png$/,
        include: [
          path.resolve(__dirname, '../', 'src', 'assets')
        ],
        use: [
          'file-loader',
        ]
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'true'
    }),
    new CleanWebpackPlugin(
      path.resolve(__dirname, '..', 'src', 'build/*.*'),
      {
        root: path.resolve(__dirname, '..', 'src'),
        verbose: true,
        exclude: ['data.json']
      }
    ),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin()
  ],
};

const serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '../'),
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: 'false'
    })
  ]
};

module.exports = [browserConfig, serverConfig]
