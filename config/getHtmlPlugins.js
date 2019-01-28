/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-11 15:56:30
 * @LastEditors: Charles
 * @LastEditTime: 2019-01-28 17:17:55
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./defaultPaths');
const {getConfJsPath,getDllJsPath}=require('./getScriptPaths');
const verifyHtml =require('../util/verifyHtml');

//console.log(scripts,scripts);
/**
 * @description: 设置htmlPlugins 针对单个文件及多个文件
 * @param1: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:16:24
 */
module.exports = function getHtmlPlugins(entries) {
  //验证模板文件
  verifyHtml(paths.appHtml);
  const config=getConfJsPath()
  const scripts=getDllJsPath();
  if (typeof entries === 'string' || Array.isArray(entries)) {
    return [
      new HtmlWebpackPlugin({
        template: paths.appHtml,
        filename: "index.html",
        minify: true,
        title:'',
        assets:{
          scripts,
          config
        },
        chunksSortMode:"none"
      }),
    ];
  }
  const entriesNames = Object.keys(entries);
  return entriesNames.map((entryName) => {
    return new HtmlWebpackPlugin({
      excludeChunks: entriesNames.filter((n) => n !== entryName),
      filename: `${entryName}.html`,
      template: paths.appHtml,
      minify: true,
      title:'',
      assets:{
        scripts,
        config
      },
      //chunksSortMode:"none",
      chunksSortMode: 'none'
    });
  });
};
