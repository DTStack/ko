const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackBaseConf = require('./base');
const { opts } = require('../../util/program');

const { analyzer } = opts;

function getWebpackDev() {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  const plugins = [new webpack.HotModuleReplacementPlugin()];
  analyzer && plugins.push(new BundleAnalyzerPlugin());
  return merge(webpackBaseConf, {
    devtool: 'cheap-module-source-map',
    plugins,
  });
}

function getWebpackPro() {
  const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
  const willMergeConfig = {
    plugins: [],
  };
  willMergeConfig.optimization = {
    moduleIds: 'hashed',
    minimizer: [new CssMinimizerPlugin()],
  };
  willMergeConfig.plugins.push(
    new webpack.optimize.SplitChunksPlugin({
      chunks: 'async',
      minSize: 30000,
      maxSize: 600000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '_',
      cacheGroups: {
        antd: {
          name: 'antd',
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          chunks: 'initial',
        },
        lodash: {
          name: 'lodash',
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          chunks: 'initial',
          // 默认组的优先级为负数，以允许任何自定义缓存组具有更高的优先级（默认值为0）
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    })
  );
  return merge(webpackBaseConf, willMergeConfig);
}

module.exports = {
  getWebpackDev,
  getWebpackPro,
};
