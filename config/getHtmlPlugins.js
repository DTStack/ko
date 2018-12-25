const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const paths = require('./defaultPaths');
const getScript=require('./getScript');
const verifyHtml =require('../util/verifyHtml');
const verifyConfig=require('../util/verifyConfig')

//console.log(scripts,scripts);
module.exports = function getHtmlPlugins(entries) {
  //验证模板文件
  verifyHtml(paths.appHtml);
  const config=verifyConfig(paths.appConfig);
  const scripts=getScript();
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
      chunksSortMode:"none"
    });
  });
};
