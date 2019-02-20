/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-20 14:17:11
 * @LastEditors: Charles
 * @LastEditTime: 2019-02-20 14:31:32
 */

const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const getWebpackBase = require('./webpackBase');

module.exports = function getWebpackDev(program) {
  const plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ];
  if (process.env.ANALYZER) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 8888,
      })
    );
  }
  /**
   * @description: 开发环境配置
   * @param1: param
   * @param2: param
   * @return: ret
   * @Author: Charles
   * @Date: 2018-12-26 11:25:19
   */
  const baseConfig = getWebpackBase(program);
  // 配置合并
  // 开发环境下 publicPath 指定为 / 与 webpack server 一致
  return webpackMerge(baseConfig, {
    devtool: 'cheap-module-source-map',
    output: {
      publicPath: '/',
    },
    plugins,
  });
};
