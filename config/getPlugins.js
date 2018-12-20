
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const getHtmlPlugins = require('./getHtmlPlugins');
const getDllPlugins=require('./getDllPlugins');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const paths = require('./defaultPaths');
const getTopBanner=require ('./getTopBanner');
const webpack = require('webpack');
let cleanPath = ['dist']
let cleanOpt = {
    root:paths.appDirectory,
    exclude:  ['dll'],
    verbose:  false,
    dry:      false
  }
module.exports = (entry) => {
  const plugins = [
    new MiniCssExtractPlugin({
      filename:'css/[name].[hash:6].css',
      chunkFilename:'css/[id].[hash:6].css' 
    }),
    new FilterWarningsPlugin({
      exclude: /Conflicting order between:/,
    }),
    new webpack.BannerPlugin(
      getTopBanner()
    ),
    new SimpleProgressPlugin(),
    new CaseSensitivePathsPlugin()
  ];
  if(process.env.NODE_ENV=='production'){
    plugins.push(new CleanWebpackPlugin(cleanPath, cleanOpt));
  }
  //引入 dll 文件
  Array.prototype.push.apply(plugins, getDllPlugins());
  // 增加 html 输出，支持多页面应用
  Array.prototype.push.apply(plugins, getHtmlPlugins(entry));
  return plugins;
};
