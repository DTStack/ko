const { mergeWithCustomize, unique } = require('webpack-merge');
const {
  appDirectory: context,
  appModules,
  appDist,
  appTsConfig,
} = require('../defaultPaths');
const { getFileRealPath } = require('../../util/file');
const { webpack } = require('../../util/userConfig');
const { PROD, DEV } = require('../../constants/env');

const pluginsUnique = (pluginsName) =>
  unique(
    'plugins',
    pluginsName,
    (plugin) => plugin.constructor && plugin.constructor.name
  );

function getWebpackBaseConf() {
  const { opts } = require('../../util/program');
  const getLoaders = require('./loaders');
  const getPlugins = require('./plugins');
  const loaders = getLoaders();
  const plugins = getPlugins();
  const { hash, ts } = opts;
  const entry = {
    index: getFileRealPath(`src/index.${ts ? 'tsx' : 'js'}`),
  };
  const output = {
    path: appDist,
    filename: hash ? 'js/[name].[contenthash].js' : 'js/[name].js',
    publicPath: '/',
  };

  const webpackConfig = {
    mode: process.env.NODE_ENV === PROD ? PROD : DEV,
    context,
    entry,
    output,
    module: {
      rules: loaders,
    },
    plugins,
    resolve: {
      modules: [appModules, 'node_modules'],
      extensions: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.vue',
        '.css',
        '.scss',
        '.less',
        '.json',
        '.html',
      ],
      alias: {
        vue$: 'vue/dist/vue.esm.js', // TODO: check this with vue framework
      },
    },
    performance: {
      hints: false,
    },
    node: false,
  };
  if (ts) {
    const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
    webpackConfig.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: appTsConfig,
      }),
    ];
  }
  return mergeWithCustomize({
    customizeArray: pluginsUnique(['HtmlWebpackPlugin']),
  })(webpackConfig, webpack);
}

module.exports = getWebpackBaseConf();
