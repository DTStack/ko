const { resolve } = require('path');
const userHome = require('user-home');
const { getFileRealPath } = require('../util/file');

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
  userCacheRepoDir: resolve(userHome, '.ko-scaffold'), // TODO: refactor this
  prettierignore:
    getFileRealPath('.prettierignore') ||
    resolve(__dirname, '../.prettierignore'),
  eslintignore:
    getFileRealPath('.eslintignore') || resolve(__dirname, '../.eslintignore'),
  appDirectory: process.cwd(),
  scaffoldConfUrl: 'https://dtux-kangaroo.github.io/ko-config/ko-script.json',
};
