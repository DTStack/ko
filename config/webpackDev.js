const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

const getWebpackBase = require('./webpackBase');

module.exports = function getWebpackDev() {
  const plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ];
  const baseConfig = getWebpackBase();
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
