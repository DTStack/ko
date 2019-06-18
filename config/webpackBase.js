/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-24 15:51:59
 * @LastEditors: Charles
 * @LastEditTime: 2019-06-18 17:03:42
 */
const { differenceWith } = require('lodash');
const webpackMerge = require('webpack-merge');
const getRules = require('./getRules');
const getPlugins = require('./getPlugins');
const processEntry = require('./processEntry');
const getEntry=require ('./getEntry')
const paths = require('./defaultPaths');
const {isAbsolute}=require('../util/fileService');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TS_LOADER = require.resolve('ts-loader');
const {createHappyPlugin}=require("../util/createHappyPlugin")
const HAPPY_PACK = require.resolve('happypack/loader');

/**
 * 合并 plugin 操作，
 * @param  {array} uniques plugin 名单，在这名单内的插件会过滤掉，不会出现两份，以用户的配置为准。
 * @return {array}
 */
const pluginsUnique = (uniques) => {
  const getter = (plugin) => plugin.constructor && plugin.constructor.name;
  return (a, b, k) => {
    if (k === 'plugins') {
      return [
        ...differenceWith(a, b, (item, item2) => {
          return (
            uniques.indexOf(getter(item)) >= 0 && getter(item) === getter(item2)
          );
        }),
        ...b,
      ];
    }
  };
};
/**
 * @description: webpack基本配置
 * @param1: param
 * @param2: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:24:53
 */
module.exports = function getWebpackBase(program) {
  const result=getEntry(program);
const tsRule=[
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    loader: HAPPY_PACK,
    options: {
        id: "happy-babel-ts"
    }
}];
  const tsPlugin=[  
    new ForkTsCheckerWebpackPlugin({
    async: false,
    watch: paths.appSrc,
    tsconfig: paths.appTsConfig
   }),
   createHappyPlugin('happy-babel-ts', [{
    loader: TS_LOADER,
    options:{
      transpileOnly: true,
      happyPackMode:true
    }}])
  ];
  

  const webpackConfig = {
    mode: process.env.NODE_ENV,
    context: paths.appDirectory,
    entry:result.entry,
    output: Object.assign(
      {
        path: paths.appDist,
        filename:process.env.HASH ? 'js/[name].[hash:6].js' : 'js/[name].js',
        publicPath:'/'
      }
    ),
    resolve: {
      modules: [paths.appModules, 'node_modules'],
      extensions: ['.js', '.jsx', '.scss', '.css', '.less','.json','.html','.vue','.ts','.tsx',],
      alias:{
        'vue$':'vue/dist/vue.esm.js'
      },
      plugins:program.ts?
      [
        new TsconfigPathsPlugin({ 
          configFile: paths.appTsConfig,
          extensions: ['.ts', '.tsx', '.js', '.jsx']
         }),
      ]:[]
    },
    module: {
      rules: program.ts?getRules().concat(tsRule):getRules(),
    },
    performance: { //打包性能配置
      hints: false, // 关闭性能提示
    },
    plugins: program.ts? getPlugins(result.entry).concat(tsPlugin):getPlugins(result.entry),
    optimization: {},
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
  };
   
  const finalWebpackConfig = webpackMerge({
    customizeArray: pluginsUnique(['HtmlWebpackPlugin'])
  })(webpackConfig, result.webpack);
  finalWebpackConfig.output.path=isAbsolute(finalWebpackConfig.output.path);
  finalWebpackConfig.entry=processEntry(finalWebpackConfig.entry);
  return finalWebpackConfig;
};
