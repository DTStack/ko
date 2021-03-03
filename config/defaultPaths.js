const { resolve } = require('path');
const userHome = require('user-home');
const parseUrl = require('url');
const { getFileRealPath } = require('../util/file');

function parsePath(urlApi) {
  return parseUrl.parse(urlApi);
}

module.exports = {
  appBuild: getFileRealPath('build'),
  appDist: getFileRealPath('dist'),
  appDll: getFileRealPath('dll'),
  appPublic: getFileRealPath('public'),
  appHtml: getFileRealPath('public/index.html'),
  appConfig: getFileRealPath('public/config'),
  appPkg: getFileRealPath('package.json'),
  appAsset: getFileRealPath('dll/bundle.json'),
  appSrc: getFileRealPath('src'),
  appTsConfig: getFileRealPath('tsconfig.json'),
  appModules: getFileRealPath('node_modules'),
  appGhPage: getFileRealPath('gh-pages'),
  userCacheRepoDir: resolve(userHome, '.ko-scaffold'),
  appDirectory: process.cwd(),
  parsePath, //TODO: move this function to utils
  scaffoldConfUrl: 'https://dtux-kangaroo.github.io/ko-config/ko-script.json',
};
