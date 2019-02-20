/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-17 19:53:52
 * @LastEditors: Charles
 * @LastEditTime: 2019-02-20 15:20:24
 */
const path = require('path');
const getBabelConf = require('./getBabelConf');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const paths = require('./defaultPaths');
const pkg=require(paths.appPkg);
const {formatBundle}=require('../util');
let dependencies = Object.keys(pkg.dependencies) || [];
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BABEL_LOADER = require.resolve('babel-loader');
const deepAssign = require('deep-assign');
const getUserConf = require('./getUserConf');
let cleanPath = ['dll']
let cleanOpt = {
    root:paths.appDirectory,
    verbose:  false,
    dry:      false
  }
/**
 * @description: DllPlugin生产配置
 * @param1: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:26:58
 */  
module.exports=function(s){
 const babelConfig = getBabelConf();
 const userConfig = getUserConf();
 const {dll=[]}=userConfig;
 let splicModules=dll.length?dll:dependencies;
 //console.log(splicModules,'11212');
 return {
        mode:"production", //process.env.NODE_ENV === 'production' ? 'production' : 'development',
        entry:formatBundle(splicModules,s),
        module: {
          rules: [
            {
              test: /\.jsx|.js?$/,
              exclude: /node_modules/,
              loader: BABEL_LOADER,
              options: deepAssign({}, babelConfig, {
                  cacheDirectory: true
              }),
            },
            // {
            //   test: /\.jsx|.js?$/,
            //   //exclude: /node_modules/,
            //   loader: HAPPY_PACK,
            //   options: {
            //       id: "happy-babel-js"
            //   }
            //  }, 
          ]
        },
        output: {
          path: paths.appDll,
          filename: '[name]_[hash].js',
          library: '[name]_[hash]'
        },
        resolve: {
          alias: {vue: 'vue/dist/vue.js'}
        },
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: false // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
          ]
        },
        plugins: [
          new webpack.optimize.ModuleConcatenationPlugin(),
          new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.resolve(paths.appDll, '[name]-manifest.json'),
            context:paths.appDirectory
          }),
        
          new AssetsPlugin({
              prettyPrint: true,
              filename: 'bundle.json',
              path: paths.appDll
          }),
          new CleanWebpackPlugin(cleanPath, cleanOpt)
       ],
    
        performance: { //打包性能配置s
            hints: false, // 关闭性能提示
        },
      }
}