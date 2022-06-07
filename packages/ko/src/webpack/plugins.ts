import { IgnorePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ModuleGraphWebpackPlugin from './plugins/moduleGraphWebpackPlugin';
import { IWebpackOptions } from '../core/types';

function getPlugins(opts: IWebpackOptions) {
  return [
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash].css',
    }),
    new CaseSensitivePathsPlugin(),
    new WebpackBar(),
    new CleanWebpackPlugin({
      verbose: false,
      dry: false,
    }),
    opts.experiment?.speedUp && new ModuleGraphWebpackPlugin(opts),
    new ReactRefreshPlugin(),
  ];
}

export default getPlugins;
