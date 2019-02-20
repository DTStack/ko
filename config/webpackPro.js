/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-11 11:19:46
 * @LastEditors: Charles
 * @LastEditTime: 2019-02-20 11:24:25
 */
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const paths=require('./defaultPaths')
const webpack=require('webpack');
const getWebpackBase = require('./webpackBase');
const colors=require('colors');

/**
 * @description: webpack生产环境配置
 * @param1: param
 * @param2: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:26:26
 */
module.exports = function getWebpackPro(program) {
  const baseConfig = getWebpackBase(program);
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      { from: paths.appDll,to:paths.appDist+'/dll'},
    ]),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    }),
    new OptimizeCSSAssetsPlugin({}),
    new webpack.optimize.SplitChunksPlugin({
      // chunks: "initial"，"async"和"all"分别是：初始块，按需块或所有块；
      chunks: 'all',
      // （默认值：30000）块的最小大小
      minSize: 30000,
      // （默认值：1）分割前共享模块的最小块数
      minChunks: 1,
      // （缺省值5）按需加载时的最大并行请求数
      maxAsyncRequests: 8,
      // （默认值3）入口点上的最大并行请求数
      maxInitialRequests: 8,
      // webpack 将使用块的起源和名称来生成名称: `vendors~main.js`,如项目与"~"冲突，则可通过此值修改，Eg: '-'
      automaticNameDelimiter: '~',
      // cacheGroups is an object where keys are the cache group names.
      name: true,
      acheGroups: {
        // 设置为 false 以禁用默认缓存组
        default: false,
        element: {
          name: 'lodash',
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          chunks: 'initial',
          // 默认组的优先级为负数，以允许任何自定义缓存组具有更高的优先级（默认值为0）
          priority: -10
        }
      }
    }),
  )
  return webpackMerge(baseConfig, {});
};
