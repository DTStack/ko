const { prettier } = require("../getUserConf");

const defaultPrettierConf = {
  bracketSpacing: true,
  singleQuote: true,
  jsxBracketSameLine: true,
  trailingComma: "es5",
  arrowParens: "always",
  printWidth: 80,
  parser: "babel",
};

const config = Object.assign({}, defaultPrettierConf, prettier);

module.exports = config;
