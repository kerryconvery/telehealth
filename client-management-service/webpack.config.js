const webpack = require('webpack');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, './');
const DIST_DIR = path.resolve(ROOT_DIR, './dist');

module.exports = {
  entry: [
    './src/index.ts',
  ],
  output: {
    path: DIST_DIR,
    filename: 'index.js',
    libraryTarget: 'this',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.ts'],
  },
  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/)
  ],
  mode: 'production',
};
