/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-10 16:29:17
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:29:29
 */
const detect = require('detect-port');
const inquirer = require('inquirer');
const isInteractive = process.stdout.isTTY;
async function checkPort(defaultPort) {
  let newPort = await detect(defaultPort);
  if (newPort === defaultPort) {
    return newPort;
  }
  if (isInteractive) {
    return changePort(newPort, defaultPort);
  }
}
/**
 * @description: 检查端口是否存在
 * @param1: newPort 启用新端口
 * @param2: default 默认端口
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:28:42
 */
async function changePort(newPort, defaultPort) {
  const question = {
    type: 'confirm',
    name: 'changePort',
    message: `${defaultPort} 端口已被占用，是否使用${newPort}端口启动？`,
    default: true,
  };
  let answer = await inquirer.prompt(question);
  if (answer.changePort) {
    return newPort;
  } else {
    return null;
  }
}

module.exports = checkPort;
