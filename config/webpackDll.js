const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const paths = require('./defaultPaths');
const pkg=require(paths.appPkg);
const {formatBundle}=require('../util');
let dependencies = Object.keys(pkg.dependencies) || [];

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
        })
       ],
    
        performance: { //打包性能配置
            hints: false, // 关闭性能提示
        },
      }
}