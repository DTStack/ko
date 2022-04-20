import { IgnorePlugin } from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import WebpackBar from 'webpackbar';
import config from '../utils/config';

function getPlugins() {
  const { userConf } = config;
  let plugins = [
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    new CaseSensitivePathsPlugin(),
    new ReactRefreshPlugin(),
    new WebpackBar(),
  ];
  plugins = plugins.concat(userConf.plugins || []);
  if (config.isProductionEnv) {
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    const prodPlugins = [
      new CleanWebpackPlugin({
        verbose: false,
        dry: false,
      }),
    ];
    plugins.concat(prodPlugins);
  }
  return plugins;
}

export default getPlugins;
