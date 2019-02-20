/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-24 15:51:59
 * @LastEditors: Charles
 * @LastEditTime: 2019-02-20 11:59:37
 */
const { differenceWith } = require('lodash');
const webpackMerge = require('webpack-merge');

const getUserConf = require('./getUserConf');
const getRules = require('./getRules');
const getPlugins = require('./getPlugins');
const processEntry = require('./processEntry');
const getEntry=require ('./getEntry')
const paths = require('./defaultPaths');
const {isAbsolute}=require('../util/fileService');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TS_LOADER = require.resolve('ts-loader');

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
  const entry=getEntry(program);
  const userConfig = getUserConf();
  const {webpack={}}=userConfig;
  const entries={...entry,...webpack.entry};
  const tsRule= [{
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader:TS_LOADER,
        options: {
          transpileOnly: true,
        },
      },
    ],
  }];
  const tsPlugin=[  
    new ForkTsCheckerWebpackPlugin({
    async: false,
    watch: paths.appSrc,
    tsconfig: paths.appTsConfig
   })]
  const webpackConfig = {
    mode: process.env.NODE_ENV,
    context: paths.appDirectory,
    entry:entries,
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
    plugins: program.ts? getPlugins(entries).concat(tsPlugin):getPlugins(entries),
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
  })(webpackConfig, webpack);
  finalWebpackConfig.output.path=isAbsolute(finalWebpackConfig.output.path);
  finalWebpackConfig.entry=processEntry(finalWebpackConfig.entry);
  return finalWebpackConfig;
};
