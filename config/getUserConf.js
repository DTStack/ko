/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-24 15:51:59
 * @LastEditors: 云乐
 * @LastEditTime: 2021-03-09 13:31:28
 */
const fs = require("fs");
const userConfFile = "ko.config.js";
const { getCurFilePath } = require("../util");
const webpack2 = require("webpack");
function getUserConf() {
  let curFilePath = getCurFilePath(userConfFile);
  if (fs.existsSync(curFilePath)) {
    return require(curFilePath)({ webpack2 });
  } else {
    return {
      proxy: [],
      dll: [],
      server: {},
      webpack: {},
      move: {},
      babel: {},
      prettier: "",
      eslint: "",
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
const userConf = getUserConf();
const {
  proxy = {},
  server = {},
  webpack = {},
  move = {},
  dll = [],
  babel = {},
  prettier={},
  eslint = {},
} = userConf;

module.exports = {
  proxy,
  server,
  webpack,
  move,
  dll,
  babel,
  prettier,
  eslint,
};
