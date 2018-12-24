const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;
const getWebpackBase = require('./webpackBase');

module.exports = function getWebpackDev() {
  const plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ];
  // if (process.env.ANALYZER) {
  //   plugins.push(
  //     new BundleAnalyzerPlugin({
  //       analyzerPort: process.env.ANALYZER_PORT || '9000',
  //     })
  //   );
  // }
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
