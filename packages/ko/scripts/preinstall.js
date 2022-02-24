/* eslint-disable no-octal-escape */
/**
 * @link https://github.com/DTStack/devops/blob/main/force-using-yarn-and-lock-version/preinstall.js
 */
let err = false;

const LOCK_NODE_VERSION = true;
const LOCK_YARN_VERSION = false;
const FORCE_YARN_INSTALL = false;

if (LOCK_NODE_VERSION) {
  const majorAndMinorNodeVersion = Number(
    /(\d+).(\d+)/.exec(process.versions.node)[0]
  );
  /**
   *  webpack minor support version
   *  @link https://webpack.js.org/migrate/5/#preparations
   */
  const webpack5SupportLeastVersion = 10.13;

  if (majorAndMinorNodeVersion < webpack5SupportLeastVersion) {
    console.error(
      '\033[1;31m*** Webpack 5 requires at least Node.js 10.13.0 (LTS), please make sure you upgrade your Node.js.\033[0;0m'
    );
    err = true;
  }
}

if (LOCK_YARN_VERSION) {
  const cp = require('child_process');
  const yarnVersion = cp.execSync('yarn -v', { encoding: 'utf8' }).trim();
  const parsedYarnVersion = /^(\d+)\.(\d+)\./.exec(yarnVersion);
  const majorYarnVersion = parseInt(parsedYarnVersion[1]);
  const minorYarnVersion = parseInt(parsedYarnVersion[2]);

  if (majorYarnVersion < 1 || minorYarnVersion < 10) {
    console.error('\033[1;31m*** Please use yarn >=1.10.1.\033[0;0m');
    err = true;
  }
}

if (FORCE_YARN_INSTALL) {
  // eslint-disable-next-line dot-notation
  if (!/yarn[\w-.]*\.js$|yarnpkg$/.test(process.env['npm_execpath'])) {
    console.error(
      '\033[1;31m*** Please use yarn to install dependencies.\033[0;0m'
    );
    err = true;
  }
}

err && process.exit(1);
