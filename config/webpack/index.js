const webpack = require('webpack');
const { merge } = require('webpack-merge');
const getDevServerConfig = require('./devServer');

function getWebpackDev() {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  const { opts } = require('../../util/program');
  const webpackBaseConf = require('./base');
  const plugins = [new webpack.HotModuleReplacementPlugin()];
  opts.analyzer && plugins.push(new BundleAnalyzerPlugin());
  return merge(webpackBaseConf, {
    devtool: 'cheap-module-source-map',
    plugins,
  });
}

function getWebpackPro() {
  const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
  const webpackBaseConf = require('./base');
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
  getDevServerConfig,
  getWebpackPro,
};
