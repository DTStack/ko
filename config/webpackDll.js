/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-17 19:53:52
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:27:30
 */
const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const paths = require('./defaultPaths');
const pkg=require(paths.appPkg);
const {formatBundle}=require('../util');
let dependencies = Object.keys(pkg.dependencies) || [];
const CleanWebpackPlugin = require('clean-webpack-plugin')
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
module.exports=function(){
 return {
        mode:"production",
        entry:formatBundle(dependencies),
        output: {
          path: paths.appDll,
          filename: '[name]_[hash].js',
          library: '[name]_[hash]'
        },
        plugins: [new webpack.DllPlugin({
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
    
        performance: { //打包性能配置
            hints: false, // 关闭性能提示
        },
      }
}