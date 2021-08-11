const { exec } = require('child_process');
const { logWithColor } = require('../util/stdout');
const { prettierCmd, eslintCmd } = require('../config/lint');

module.exports = function lint() {
  exec(prettierCmd, (error, stdout) => {
    if (error) {
      logWithColor('red', 'prettier failed:' + error);
      process.stdout.write(stdout);
      process.exit(1);
    } else {
      exec(eslintCmd, (ex, stdout) => {
        if (ex) {
          logWithColor('red', 'eslint failed:');
          process.stdout.write(stdout);
          process.exit(1);
        } else {
          logWithColor('green', 'code has been linted successfully!');
          process.exit(0);
        }
      });
    }
  });
};
