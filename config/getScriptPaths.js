const paths = require('./defaultPaths');
const { merge } = require('webpack-merge');
const { existsSync } = require('../util/fileService');
const userConf = require('./getUserConf')();
const defaultPublicPath = {
  output: {
    publicPath: '/',
  },
};

const publicPath = merge(defaultPublicPath, userConf.webpack).output.publicPath;
const defaultConfig = {
  development: 'conf.dev.js',
  production: 'conf.prod.js',
};
const getConfig = env => {
  let config;
  console.log(`build environment:${process.env.NODE_ENV}`);
  config = defaultConfig[env];
  if (config) {
    return config;
  } else {
    return `conf.${env}.js`;
  }
};
module.exports = {
  getConfJsPath: () => {
    let confFile = getConfig(process.env.NODE_ENV);
    let isAbsFile = `${paths.appConfig}/${confFile}`;
    let conf = '';
    if (existsSync(isAbsFile)) {
      conf = `<script src="${publicPath}config/${confFile}"></script>`;
    }
    return conf;
  },
  getAssetsConfPath: (env) => {
    return `config/conf.${env}.js`
  },
  getDllJsPath: () => {
    let assetObj = require(paths.appAsset);
    let { keys } = Object;
    let script = '';
    for (let key of keys(assetObj)) {
      script += `<script src="${publicPath}dll/${assetObj[key].js}"></script>\n`;
    }
    return script;
  },
};
