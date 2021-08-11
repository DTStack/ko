import webpack from 'webpack';
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
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:6].css',
      chunkFilename: 'css/[id].[hash:6].css',
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
  plugins = plugins.concat(userConf.plugins);
  if (config.isProductionEnv) {
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    plugins.push(
      new CleanWebpackPlugin({
        verbose: false,
        dry: false,
      })
    );
  }
  return plugins;
}

export default getPlugins;