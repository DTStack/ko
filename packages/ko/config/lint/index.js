const path = require('path');
const { prettierignore, eslintignore } = require('../../config/defaultPaths');
const prettier = path.resolve(__dirname, '../../node_modules/.bin/prettier');
const eslint = path.resolve(__dirname, '../../node_modules/.bin/eslint');
const prettierConfPath = path.resolve(__dirname, './getPrettierConf.js');
const eslintConfPath = path.resolve(__dirname, './getEslintConf.js');

const prettierCmd = `${prettier} --config ${prettierConfPath} --ignore-path ${prettierignore} --write .`;
const eslintCmd = `${eslint} . -c ${eslintConfPath} --ignore-path ${eslintignore} --ext .js,.jsx,.ts,.tsx --fix`;

module.exports = {
  prettierCmd,
  eslintCmd,
};
