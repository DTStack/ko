const { realpathSync } = require('fs');
const { resolve } = require('path');
const appDirectory = realpathSync(process.cwd());

function resolveApp(relativePath) {
  return resolve(appDirectory, relativePath);
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
  appModules: resolveApp('node_modules'),
  appGhPage:resolveApp('gh-pages'),
  resolveApp,
  appDirectory
};
