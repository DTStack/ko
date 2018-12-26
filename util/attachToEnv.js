/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-10 16:09:59
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:28:35
 */
/**
 * attach argv into process.env
 *
 * @param {object} args commander
 */
const decamelize = require('decamelize');
const camelcase = require('camelcase');

/**
 * @description: 命令添加到环境变量
 * @param2: 命令参数
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:28:08
 */
module.exports = (program) => {
  const envWhiteList = program.options.map((option) => {
    return camelcase(option.long);
  });
  envWhiteList.forEach((key) => {
    if (key in program) {
      const k = decamelize(key).toUpperCase();
      process.env[k] = program[key];
    }
  });
};
