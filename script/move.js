const { existsSync } = require('../util/fileService');
const { appDist, appGhPage } = require('../config/defaultPaths');
const colors = require('colors');
const shell = require('shelljs');
const getUserConf = require('../config/getUserConf');

function isExistDir(params) {
  const { keys } = Object;
  for (const key of keys(params)) {
    if (!existsSync(params[key])) {
      shell.mkdir('-p', params[key]);
      console.log(
        [
          `    - Local:   ${colors.green('创建' + params[key] + '目录完成')}`,
        ].join('\n')
      );
    }
  }
}
module.exports = () => {
  try {
    const userConfig = getUserConf();
    const oldConf = {
      from: appDist,
      to: appGhPage,
    };
    const { move = {} } = userConfig;

    const newMove = { ...oldConf, ...move };
    isExistDir(newMove);
    shell.cp('-rf', newMove.from + '/*', newMove.to);
    console.log([`    - Tip:   ${colors.green('目录移动完成')}`].join('\n'));
  } catch (err) {
    console.log(
      [`    - Tip:   ${colors.red('目录移动失败')} ${err}`].join('\n')
    );
  }
};
