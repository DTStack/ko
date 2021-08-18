import { IgnorePlugin, ProgressPlugin } from 'webpack';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTagsPlugin from 'html-webpack-tags-plugin';
import config from '../utils/config';
import { Options } from '../interfaces';

function getPlugins(opts: Options) {
  const { ts, env } = opts;
  const { userConf, defaultPaths } = config;
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
    }),
    new HtmlWebpackTagsPlugin({
      tags: [`config/conf.${env}.js`],
      append: false,
    }),
  ];
  if (ts) {
    const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
    const typescriptPlugins = [
      new ForkTsCheckerWebpackPlugin({
        async: false,
        typescript: {
          configFile: defaultPaths.tsconfig,
        },
      }),
    ];
    plugins = plugins.concat(typescriptPlugins);
  }
  plugins = plugins.concat(userConf.plugins || []);
  if (config.isProductionEnv) {
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    const prodPlugins = [
      new CleanWebpackPlugin({
        verbose: false,
        dry: false,
      })
    ];
    plugins.concat(prodPlugins);
  }
  return plugins;
}

export default getPlugins;