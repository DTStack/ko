const { exec } = require('child_process');
const { logWithColor } = require('../util/stdout');
const { prettierCmd, eslintCmd } = require('../config/lint');

module.exports = function lint() {
  exec(prettierCmd, (error) => {
    if (error) {
      logWithColor('red', 'prettier failed:' + error);
      process.exit(1);
    } else {
      exec(eslintCmd, (ex) => {
        if (ex) {
          logWithColor('red', 'eslint failed:' + error);
          process.exit(1);
        } else {
          logWithColor('green', 'code has been linted successfully!');
          process.exit(0);
        }
      });
    }
  });
};
