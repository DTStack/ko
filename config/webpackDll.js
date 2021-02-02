/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-17 19:53:52
 * @LastEditors  : Charles
 * @LastEditTime : 2020-01-10 16:27:44
 */
const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const paths = require('./defaultPaths');
const pkg = require(paths.appPkg);
const { formatBundle } = require('../util');
const dependencies = Object.keys(pkg.dependencies) || [];
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BABEL_LOADER = require.resolve('babel-loader');
const deepAssign = require('deep-assign');
const getUserConf = require('./getUserConf');
let cleanPath = ['dll'];
let cleanOpt = {
  root: paths.appDirectory,
  verbose: false,
  dry: false,
};

module.exports = function(s) {
  const userConfig = getUserConf();
  const { dll = [], babel = {} } = userConfig;
  let splicModules = dll.length ? dll : dependencies;
  const babelConf = require('ko-babel-app')(babel.plugins, babel.targets);
  return {
    mode: 'production',
    entry: formatBundle(splicModules, s),
    module: {
      rules: [
        {
          test: /\.(js|jsx|mjs)$/,
          exclude: /node_modules/,
          loader: BABEL_LOADER,
          options: deepAssign({}, babelConf, {
            cacheDirectory: true,
          }),
        },
      ],
    },
    output: {
      path: paths.appDll,
      filename: '[name]_[hash].js',
      library: '[name]_[hash]',
    },
    resolve: {
      alias: { vue: 'vue/dist/vue.js' },
    },
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.DllPlugin({
        name: '[name]_[hash]',
        path: path.resolve(paths.appDll, '[name]-manifest.json'),
        context: paths.appDirectory,
      }),

      new AssetsPlugin({
        prettyPrint: true,
        filename: 'bundle.json',
        path: paths.appDll,
      }),
      new CleanWebpackPlugin({
        verbose: false,
        dry: false,
      }),
    ],
    performance: {
      //打包性能配置s
      hints: false, // 关闭性能提示
    },
  };
};
