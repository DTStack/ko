const { existsSync } = require('fs');
const { resolve } = require('path');
const userConfFileName = 'ko.config.js';
const webpack = require('webpack');

function getUserConf() {
  const userConfFile = resolve(process.cwd(), userConfFileName);
  if (existsSync(userConfFile)) {
    return require(userConfFile)({ webpack });
  }
  return {
    //TODO: redefined default exports
    webpack: {},
    move: {},
    babel: {},
    prettier: '',
    eslint: '',
  };
}

const userConf = getUserConf();

module.exports = userConf;
