#! /usr/bin/env node

'use strict';
const program = require('commander');
const attachToEnv = require('../util/attachToEnv');
const lint = require('../script/lint');
const colors = require('colors');
const ora = require('ora');
program.parse(process.argv);
attachToEnv(program);

try {
  const spinner = ora('Linting').start();
  setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'lint...';
  }, 100);
  lint(program);
  spinner.stop();
} catch (err) {
  console.log(colors.red)('服务启动失败，请检查package中dependencies依赖包');
}
