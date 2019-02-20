#! /usr/bin/env node

const program = require('commander');
const colors = require('colors');
const inquirer = require('inquirer');
const swagger = require('../script/swagger.js');
const logs = console.log;
program
    .option('-p, --port <port>', '服务端口号')
    .parse(process.argv);

try {
    inquirer
        .prompt([
            {
                type: 'Input',
                name: 'swagger',
                message: '请输入swagger地址',
                default: 'http://172.16.8.194:8891/swagger-ui.html#/'
            }
        ])
        .then((answers) => {
            if (answers.swagger == '') {
                throw '请输入swagger地址';
            } else {
                swagger(answers.swagger)
            }
        })
} catch (err) {
    logs(colors.red(err || '服务启动失败'));
}