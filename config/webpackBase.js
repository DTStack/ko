/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-24 15:51:59
 * @LastEditors  : Charles
 * @LastEditTime : 2020-01-08 16:46:39
 */
const { mergeWithCustomize, unique } = require('webpack-merge');
const getRules = require('./getRules');
const getPlugins = require('./getPlugins');
const processEntry = require('./processEntry');
const getEntry = require('./getEntry');
const paths = require('./defaultPaths');
const { isAbsolute } = require('../util/fileService');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TS_LOADER = require.resolve('ts-loader');
const { createHappyPlugin } = require('../util/createHappyPlugin');
const HAPPY_PACK = require.resolve('happypack/loader');
const getUserConf = require('./getUserConf');

/**
 * 合并 plugin 操作，
 * @param  {array} uniques plugin 名单，在这名单内的插件会过滤掉，不会出现两份，以用户的配置为准。
 * @return {array}
 */
const pluginsUnique = pluginsName =>
  unique(
    'plugins',
    pluginsName,
    plugin => plugin.constructor && plugin.constructor.name
  );
/**
 * @description: webpack基本配置
 * @param1: param
 * @param2: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:24:53
 */
const ENV_PROD = 'production';
const ENV_DEV = 'development';

module.exports = function getWebpackBase(program) {
  const { micro } = program;
  const result = getEntry(program);
  const tsRule = [
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      loader: HAPPY_PACK,
      options: {
        id: 'happy-babel-ts',
      },
    },
  ];
  const tsPlugin = [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        configFile: paths.appTsConfig,
      },
    }),
    //TODO: replace happy-loader instead of thread-loader: https://github.com/webpack-contrib/thread-loader
    createHappyPlugin('happy-babel-ts', [
      {
        loader: TS_LOADER,
        options: {
          transpileOnly: true,
          happyPackMode: true,
        },
      },
    ]),
  ];

  const output = {
    path: paths.appDist,
    filename: micro ? 'js/[name].js' : 'js/[name].[hash:6].js',
    publicPath: '/',
  };

  if (micro) {
    output.library = '[name]';
    output.libraryTarget = 'umd';
    output.globalObject = `(() => {
      if (typeof self !== 'undefined') {
          return self;
      } else if (typeof window !== 'undefined') {
          return window;
      } else if (typeof global !== 'undefined') {
          return global;
      } else {
          return Function('return this')();
      }
    })()`;
  }

  const webpackConfig = {
    mode: process.env.NODE_ENV === ENV_DEV ? ENV_DEV : ENV_PROD,
    context: paths.appDirectory,
    output: output,
    resolve: {
      modules: [paths.appModules, 'node_modules'],
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
    module: {
      rules: program.ts ? getRules().concat(tsRule) : getRules(),
    },
    performance: {
      //打包性能配置
      hints: false, // 关闭性能提示
    },
    plugins: program.ts
      ? getPlugins(result.entry, program).concat(tsPlugin)
      : getPlugins(result.entry, program),
    optimization: {},
    node: false,
  };

  //TODO: 用户自定义的plugins覆盖相应的default配置
  const finalWebpackConfig = mergeWithCustomize({
    customizeArray: pluginsUnique(['HtmlWebpackPlugin']),
  })(webpackConfig, result.webpack);
  finalWebpackConfig.output.path = isAbsolute(finalWebpackConfig.output.path);
  finalWebpackConfig.entry = processEntry(finalWebpackConfig.entry);
  return finalWebpackConfig;
};
