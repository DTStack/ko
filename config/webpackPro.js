/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-11 11:19:46
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:26:50
 */
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const paths=require('./defaultPaths')
const {existsSync}=require('../util/fileService');
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
module.exports = function getWebpackPro() {
  const baseConfig = getWebpackBase();
  baseConfig.plugins.push(
    new CopyWebpackPlugin([
      { from: paths.appDll,to:paths.appDist+'/dll'},
    ])
  )
  return webpackMerge(baseConfig, {
    optimization: {
      minimize: false,
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: {
              unused: false,
              warnings: false,
            },
            output: {
              ascii_only: true,
              comments: 'some',
              beautify: false,
            },
            mangle: true,
          },
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            cssDeclarationSorter: false,
            reduceIdents: false
          },
        }),
      ],
    },
  });
};
