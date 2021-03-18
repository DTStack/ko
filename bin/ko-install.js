const program = require('commander');
const attachToEnv = require('../util/attachToEnv');
const install = require('../script/install');
const colors = require('colors');
const log = console.log;
const ora = require('ora');
program
  .option('-n,--name <name>', '待安装组件名')
  .option('-p,--path <path>', '安装绝对路径')
  .parse(process.argv);
attachToEnv(program); // 当前终端命令假如环境变量，避免权限无法执行问题；

try {
  const spinner = ora('install ').start();
  setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'complie ...';
  }, 100);
  install(program);
  spinner.stop();
} catch (err) {
  log(
    [`    - Tip:   ${colors.red('安装组件失败，请检查组件名或者网络')}`].join(
      '\n'
    )
  );
}
