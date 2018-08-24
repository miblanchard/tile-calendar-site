const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: path.resolve(__dirname, '..', 'src/', 'client/', 'index.js'),
  output: {
    path: path.resolve(__dirname, '..', 'src/', 'build'),
    publicPath: '/build',
    filename: 'bundle.js',
  },
  stats: {
    colors: true,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
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
      // {
      //   test: /\.png$/,
      //   include: [
      //     path.resolve(__dirname, '../', 'src', 'assets')
      //   ],
      //   use: [
      //     'file-loader',
      //   ]
      // }
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
      }
    ),
  ],
};
