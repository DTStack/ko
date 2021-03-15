const { existsSync } = require('fs');
const { resolve } = require('path');
const webpack = require('webpack');
const userConfFileName = 'ko.config.js';

const emptyObject = {};
const emptyString = '';

/**
 * @returns {
 *  webpack: webpack user-defined configs
 *  babel: babel user-defined configs, Object
 *  prettier: prettier user-defined configs
 *  eslint: eslint user-defined configs
 * }
 */
function getUserConf() {
  const userConfFile = resolve(process.cwd(), userConfFileName);
  if (existsSync(userConfFile)) {
    const userConf = require(userConfFile)({ webpack }) || {};
    return {
      webpack: userConf.webpack || emptyObject,
      babel: userConf.babel || emptyObject,
      prettier: userConf.prettier || emptyString,
      eslint: userConf.eslint || emptyString,
    };
  }
  return {
    webpack: emptyObject,
    babel: emptyObject,
    prettier: emptyString,
    eslint: emptyString,
  };
}

const userConf = getUserConf();

module.exports = userConf;
