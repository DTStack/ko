#! /usr/bin/env node

const program = require('commander');
const colors = require('colors');
const inquirer = require('inquirer');
const { resolveApp } = require('../config/defaultPaths');
const swagger = require('../script/swagger.js');
const logs = console.log;
program
  .option('-p, --path', '自定义生成目录')
  .option('-t, --ts', '支持typescript')
  .parse(process.argv);

try {
  const question = [
    {
      type: 'Input',
      name: 'swagger',
      message: '请输入swagger地址(如:http://xxxxx/swagger-ui.html#/)',
    },
  ];
  program.path &&
    question.push({
      type: 'Input',
      name: 'path',
      message: '请输入生成目录(绝对路径)',
      default: '',
    });
  inquirer.prompt(question).then((answers) => {
    if (answers.swagger == '') {
      logs(colors.red('请输入swagger地址'));
    } else {
      if (!answers.path || answers.path == '') {
        answers.path = resolveApp('src/service/');
      }
      swagger(answers.swagger, answers.path, program.ts);
    }
  });
} catch (err) {
  logs(colors.red(err || '服务启动失败'));
}
