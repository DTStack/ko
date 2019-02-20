/*
 * @Description: 获取文件目录
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-20 21:10:24
 * @LastEditors: Charles
 * @LastEditTime: 2019-02-20 15:44:16
 */



const { realpathSync } = require('fs');
const { resolve } = require('path');
const userHome=require('user-home');
const appDirectory = realpathSync(process.cwd());
const parseUrl = require('url');
/**
 * @description: 根据相对路径获取绝对路径
 * @param1: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:12:29
 */
function resolveApp(relativePath) {
  return resolve(appDirectory, relativePath);
}
/**
 * @description: 根据swagger地址获取接口内容
 * @param {string} urlApi-swagger地址
 * @returns {UrlWithStringQuery} 解析后的地址
 */
function parsePath(urlApi) {
  return parseUrl.parse(urlApi);
}
module.exports = {
  appBuild: resolveApp('build'),
  appDist: resolveApp('dist'),
  appDll: resolveApp('dll'),
  appPublic:resolveApp('public'),
  appHtml:resolveApp('public/index.html'),
  appConfig: resolveApp('public/config'),
  appPkg: resolveApp('package.json'),
  appAsset:resolveApp('dll/bundle.json'),
  appSrc: resolveApp('src'),
  appTsConfig:resolveApp('tsconfig.json'),
  appModules: resolveApp('node_modules'),
  appGhPage:resolveApp('gh-pages'),
  resolveApp,
  appDirectory,
  parsePath,
  userCacheRepoDir:resolve(userHome,'.ko-scaffold'),
  scaffoldConfUrl:'https://dtux-kangaroo.github.io/ko-config/ko-script.json'
};
