const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const { appHtml, appTsConfig, appPkg } = require('../defaultPaths');
const userConf = require('../../util/userConfig');
const { PROD, DEV } = require('../../constants/env');

const { name: appPkgName } = require(appPkg);

function getPlugins() {
  const { opts } = require('../../util/program');
  const { env, ts } = opts;
  // TODO: redefined plugins order
  const userDefinedWebpackConf = userConf.webpack || {};
  const userDefinedPlugins = userDefinedWebpackConf.plugins || [];
  let plugins = [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:6].css',
      chunkFilename: 'css/[id].[hash:6].css',
    }),
    new FilterWarningsPlugin({
      exclude: /Conflicting order between:/,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new SimpleProgressPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash',
    }),
    new HtmlWebpackPlugin({
      template: appHtml,
      filename: 'index.html',
      title: appPkgName || 'Ko App',
    }),
    new HtmlWebpackTagsPlugin({
      tags: [`config/conf.${process.env.NODE_ENV === DEV ? 'dev' : env}.js`],
      append: false,
    }),
  ];
  if (ts) {
    const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
    const typescriptPlugins = [
      new ForkTsCheckerWebpackPlugin({
        async: false,
        typescript: {
          configFile: appTsConfig,
        },
      }),
    ];
    plugins = plugins.concat(typescriptPlugins);
  }
  plugins = plugins.concat(userDefinedPlugins);
  if (process.env.NODE_ENV === PROD) {
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

module.exports = getPlugins;
