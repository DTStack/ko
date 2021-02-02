#! /usr/bin/env node

'use strict';
const program = require('commander');
const attachToEnv = require('../util/attachToEnv');
const dev = require('../script/dev');
const colors = require('colors');
const log = console.log;
const ora = require('ora');
program
  .option('-p, --port <port>', '服务端口号', parseInt)
  .option('--host <host>', '服务主机名')
  .option('-t, --ts', '支持typescript')
  .option('-m, --micro', '开启微前端支持')
  .option('--enable-dll', '开启dll支持')
  .option('-a,--analyzer', '开启构建分析')
  .parse(process.argv);
attachToEnv(program); //当前终端命令假如环境变量，避免权限无法执行问题；

try {
  const spinner = ora('dev ').start();
  setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'complie ...';
  }, 100);
  dev(program);
  spinner.stop();
} catch (err) {
  log(colors.red)('服务启动失败，请检查package中dependencies依赖包');
}
