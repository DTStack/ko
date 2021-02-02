/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-24 15:51:59
 * @LastEditors: Charles
 * @LastEditTime: 2019-02-20 14:50:26
 */
const fs = require('fs');
const userConfFile = 'ko.config.js';
const { getCurFilePath } = require('../util');
const webpack = require('webpack');
function getUserConf() {
  let curFilePath = getCurFilePath(userConfFile);
  if (fs.existsSync(curFilePath)) {
    return require(curFilePath)({ webpack });
  } else {
    return {
      proxy: [],
      dll: [],
      server: {},
      webpack: {},
      move: {},
      babel: {},
      prettier: '',
      eslint: '',
    };
  }
}
/**
 * @description: 获取用户自定义配置
 * @param1: param
 * @param2: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:20:43
 */
module.exports = () => {
  const userConf = getUserConf();
  const {
    proxy = {},
    server = {},
    webpack = {},
    move = {},
    dll = [],
    babel = {},
    prettier,
    eslint,
  } = userConf;
  return {
    proxy,
    server,
    webpack,
    move,
    dll,
    babel,
    prettier,
    eslint,
  };
};
