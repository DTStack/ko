const fs = require('fs');
const { getCurFilePath } = require('../../util');
const { prettier } = require('../getUserConf');

const defaultPrettierConf = {
  bracketSpacing: true,
  singleQuote: true,
  jsxBracketSameLine: true,
  trailingComma: 'es5',
  arrowParens: 'always',
  printWidth: 80,
  parser: 'babel',
};

const userConfFile = prettier ? getCurFilePath(prettier) : '';
const userConf = userConfFile
  ? JSON.parse(fs.readFileSync(userConfFile, 'utf8'))
  : {};

const config = Object.assign({}, defaultPrettierConf, userConf);

module.exports = config;
