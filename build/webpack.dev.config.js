import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import { resolve } from 'path';
import { access, writeFile } from 'fs';

import { dev as devConfig } from '../config';
import baseWebpackConfig from './webpack.base.config';

const dataResPath = resolve(__dirname, '../src/store/dataRes.json');
access(dataResPath, (err) => {
  err && writeFile(dataResPath, JSON.stringify({}), e => e && console.log(e));
});

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': devConfig.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/assets/tpl/app.html'),
      chunks: ['app'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: devConfig.outputName,
      template: resolve(__dirname, '../src/assets/tpl/output.html'),
      chunks: [devConfig.outputChunk],
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
});
