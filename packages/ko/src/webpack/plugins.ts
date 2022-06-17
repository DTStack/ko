import { HotModuleReplacementPlugin, IgnorePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ModuleGraphWebpackPlugin from './plugins/moduleGraphWebpackPlugin';
import { IWebpackOptions } from '../core/types';

function getPlugins(opts: IWebpackOptions) {
  return [
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new MiniCssExtractPlugin({
      filename: opts.isProd ? 'css/[name].[contenthash].css' : 'css/[name].css',
      chunkFilename: opts.isProd
        ? 'css/[id].[contenthash].css'
        : 'css/[id].css',
    }),
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: opts.htmlTemplate,
    }),
    opts.copy &&
      new CopyWebpackPlugin({
        patterns: opts.copy,
      }),
    new WebpackBar(),
    new CleanWebpackPlugin({
      verbose: false,
      dry: false,
    }),
    // opts.experiment?.speedUp && new ModuleGraphWebpackPlugin(opts),
    new ReactRefreshPlugin({
      overlay: false,
    }),
    !opts.isProd && new HotModuleReplacementPlugin(),
  ].filter(Boolean);
}

export default getPlugins;
