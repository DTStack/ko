const { differenceWith } = require('lodash');
const webpackMerge = require('webpack-merge');

const getUserConf = require('./getUserConf');
const getRules = require('./getRules');
const getPlugins = require('./getPlugins');
const processEntry = require('./processEntry');
//const getEntryByPages = require('./getEntryByPages');
const getEntry=require ('./getEntry')
//const pkg = require('./packageJson');
const paths = require('./defaultPaths');

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
  const webpackConfig = {
    mode: process.env.NODE_ENV,
    context: paths.appDirectory,
    entry,
    output: Object.assign(
      {
        path: paths.appDist,
        filename:'js/[name].[hash].js',
        publicPath:process.env.NODE_ENV=='development'? '/dist':'/',
      }
    ),
    resolve: {
      modules: [paths.appModules, 'node_modules'],
      extensions: ['.js', '.jsx', '.scss', '.css', '.json','.html']
    },
    module: {
      rules: getRules(),
    },
    plugins: getPlugins({ entry}),
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
    },
  };

  const userConfig = getUserConf();
  const {server={},proxy=[],webpack={}}=userConfig;

  const finalWebpackConfig = webpackMerge({
    customizeArray: pluginsUnique(['HtmlWebpackPlugin']),
  })(webpackConfig, {});

  
  // // 单页应用 or 多页应用
  // if (finalWebpackConfig.entry) {
  //   finalWebpackConfig.entry = processEntry(finalWebpackConfig.entry);
  // } else {
  //   finalWebpackConfig.entry = processEntry(getEntryByPages());
  // }
  finalWebpackConfig.entry=processEntry(entry);
  return finalWebpackConfig;
};
