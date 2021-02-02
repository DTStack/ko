const path = require('path');
const prettier = path.resolve(__dirname, '../../node_modules/.bin/prettier');
const eslint = path.resolve(__dirname, '../../node_modules/.bin/eslint');
const prettierConfPath = path.resolve(__dirname, './getPrettierConf.js');
const eslintConfPath = path.resolve(__dirname, './getEslintConf.js');

const conf = {
  '**/*.js?(x)': [
    `${eslint} -c ${eslintConfPath} --fix`,
    `${prettier} --config ${prettierConfPath} --write`,
  ],
  '**/*.ts?(x)': [
    `${eslint} -c ${eslintConfPath} --fix`,
    `${prettier} --config ${prettierConfPath} --write`,
  ],
};

module.exports = conf;
