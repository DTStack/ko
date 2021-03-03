const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const VueLoaderPlugin = require('vue-loader/lib/plugin'); //TODO: support vue loader when it adapted webpack 5
const getRulesHappy = require('./getRulesHappy'); //TODO: remove happy-pack in the future
const { appHtml } = require('../defaultPaths');
const userConf = require('../../util/userConfig');
const { opts } = require('../../util/program');

//TODO: redefined plugins order
module.exports = () => {
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
      assets: {
        config,
      },
      chunksSortMode: 'none',
    }),
    new HtmlWebpackTagsPlugin({
      tags: [`config/conf.${opts.env}.js`],
      append: false,
    }),
  ];
  plugins = plugins.concat(userDefinedPlugins); //TODO:maybe use webpack-merge
  if (process.env.NODE_ENV == 'production') {
    plugins.push(
      new CleanWebpackPlugin({
        verbose: false,
        dry: false,
      })
    );
  }
  Array.prototype.push.apply(plugins, getRulesHappy()); // TODO: happy plugin will be removed in The future
  return plugins;
};
