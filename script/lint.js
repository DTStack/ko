const path = require('path');
const exec = require('child_process').exec;
const colors = require('colors');
const lintStaged = path.resolve(__dirname, '../node_modules/.bin/lint-staged');
const lintStagedConfPath = path.resolve(
  __dirname,
  '../config/lint/getLintStagedConf.js'
);

module.exports = function lint() {
  exec(`${lintStaged} -c ${lintStagedConfPath}`, error => {
    if (error) {
      console.log(colors.red(error));
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
};
