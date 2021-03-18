const mergeOptions = require('merge-options');
const { prettier } = require('../../util/userConfig');
const defaultPrettierConf = require('../../prettier.config');

function getLintConf() {
  if (typeof prettier === 'string') {
    return prettier ? require(prettier) : {};
  } else {
    return prettier;
  }
}

const config = mergeOptions({}, defaultPrettierConf, getLintConf());
module.exports = config;
