const path = require("path");
const prettier = path.resolve(__dirname, "../../node_modules/.bin/prettier");
const eslint = path.resolve(__dirname, "../../node_modules/.bin/eslint");
const prettierConfPath = path.resolve(__dirname, "./getPrettierConf.js");
const eslintConfPath = path.resolve(__dirname, "./getEslintConf.js");

let prettiercmd = `${prettier} --config ${prettierConfPath} --write`;
let eslintcmd = `${eslint} -c ${eslintConfPath} --fix`;

const conf = {
  "*.ts?(x)": [prettiercmd],
  "*.js?(x)": [eslintcmd,prettiercmd],
  "*.{scss,css,less,json,md,html,vue,Angular}": prettiercmd
};

module.exports = conf;
