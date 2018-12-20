const { differenceWith } = require('lodash');
const webpackMerge = require('webpack-merge');

const getUserConf = require('./getUserConf');
const getRules = require('./getRules');
const getPlugins = require('./getPlugins');
const processEntry = require('./processEntry');
const getEntry=require ('./getEntry')
const paths = require('./defaultPaths');
const {isAbsolute}=require('../util/fileService');

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
const entry=getEntry();
module.exports = function getWebpackBase() {
  const userConfig = getUserConf();
  const {webpack={}}=userConfig;
  const entries={...entry,...webpack.entry};
  const webpackConfig = {
    mode: process.env.NODE_ENV,
    context: paths.appDirectory,
    entry,
    output: Object.assign(
      {
        path: paths.appDist,
        filename:'js/[name].js',
        publicPath:'/',
      }
    ),
    resolve: {
      modules: [paths.appModules, 'node_modules'],
      extensions: ['.js', '.jsx', '.scss', '.css', '.json','.html']
    },
    module: {
      rules: getRules(),
    },
    performance: { //打包性能配置
      hints: false, // 关闭性能提示
    },
    plugins: getPlugins(entries),
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
            minChunks: 2,
          },
        },
      },
    }
  };
   
  const finalWebpackConfig = webpackMerge({
    customizeArray: pluginsUnique(['HtmlWebpackPlugin'])
  })(webpackConfig, webpack);
  finalWebpackConfig.output.path=isAbsolute(finalWebpackConfig.output.path);
  console.log(finalWebpackConfig.entry,'121312312313ppd',finalWebpackConfig.output);
  finalWebpackConfig.entry=processEntry(finalWebpackConfig.entry);
  return finalWebpackConfig;
};
