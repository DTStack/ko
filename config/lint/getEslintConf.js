const mergeOptions = require('merge-options');
const { eslint } = require('../../util/userConfig');
const defaultEslintConf = require('../../.eslintrc');
/**
 * eslint default config, user defined config file can override it
 * @ref: https://eslint.org/docs/rules/
 */

function getLintConf() {
  if (typeof eslint === 'string') {
    return eslint ? require(eslint) : {};
  } else {
    return eslint;
  }
}

const config = mergeOptions.call(
  { concatArrays: true },
  {},
  defaultEslintConf,
  getLintConf()
);
module.exports = config;
