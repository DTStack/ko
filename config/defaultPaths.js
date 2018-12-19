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
  appHtml:resolveApp('src/index.html'),
  appPkg: resolveApp('package.json'),
  appAsset:resolveApp('dll/bundle.json'),
  appSrc: resolveApp('src'),
  appModules: resolveApp('node_modules'),
  resolveApp,
  appDirectory
};
