const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const webapckBaseConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(webapckBaseConfig, {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../src/source/option.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './../src/views/option.html'),
      filename: 'index.html',
      inject: true,
    }),
  ],
  devServer: {
    port: 8000,
    hot: true,
    host: 'localhost',
  },
});
