const { mergeWithCustomize, unique } = require('webpack-merge');
const rules = require('./loaders');
const plugins = require('./plugins');
const processEntry = require('../processEntry');
const getEntry = require('./getEntry');
const { appDirectory: context, appModules } = require('../defaultPaths');
const { isAbsolute } = require('../util/fileService');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const { PROD, DEV } = require('../../constants/env');

const pluginsUnique = pluginsName =>
  unique(
    'plugins',
    pluginsName,
    plugin => plugin.constructor && plugin.constructor.name
  );

function getWebpackBaseConf(program) {
  const result = getEntry(program);
  const output = {
    path: appDist,
    filename: micro ? 'js/[name].js' : 'js/[name].[hash:6].js',
    publicPath: '/',
  };

  const webpackConfig = {
    mode: process.env.NODE_ENV === PROD ? PROD : DEV,
    context,
    entry,
    output,
    module: {
      rules,
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
        vue$: 'vue/dist/vue.esm.js',
      },
      plugins: program.ts
        ? [
            new TsconfigPathsPlugin({
              configFile: paths.appTsConfig,
              extensions: ['.ts', '.tsx', '.js', '.jsx'],
            }),
          ]
        : [],
    },
    performance: {
      hints: false,
    },
    node: false,
  };

  //TODO: 用户自定义的plugins覆盖相应的default配置
  const finalWebpackConfig = mergeWithCustomize({
    customizeArray: pluginsUnique(['HtmlWebpackPlugin']),
  })(webpackConfig, result.webpack);
  finalWebpackConfig.output.path = isAbsolute(finalWebpackConfig.output.path);
  finalWebpackConfig.entry = processEntry(finalWebpackConfig.entry);
  return finalWebpackConfig;
}

module.exports = getWebpackBaseConf();
