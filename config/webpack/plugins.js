const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin'); //TODO: support vue loader when it adapted webpack 5
const { appHtml, appTsConfig } = require('../defaultPaths');
const userConf = require('../../util/userConfig');
const { PROD } = require('../../constants/env');

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
      minify: true,
      title: '',
      chunksSortMode: 'none',
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
