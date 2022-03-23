import { IgnorePlugin, ProgressPlugin } from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import config from '../utils/config';

function getPlugins() {
  const { userConf, defaultPaths } = config;
  const publicPath =
    userConf.output && userConf.output.publicPath
      ? userConf.output.publicPath
      : '/';
  let plugins = [
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new ProgressPlugin(),
    //TODO: check if mini-css-extract-plugin should use base name if enable HMR
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    new CaseSensitivePathsPlugin(),

    new HtmlWebpackPlugin({
      template: defaultPaths.html,
      title: 'Ko App',
      templateParameters: {
        configPath: `${publicPath}config/config.js`,
      },
      inject: 'body',
    }),
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
