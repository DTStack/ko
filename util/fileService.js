/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-19 11:34:43
 * @LastEditors: Charles
 * @LastEditTime: 2019-07-10 11:58:27
 */
const fs = require('fs');
const colors = require('colors');
const { appDirectory } = require('../config/defaultPaths');
const { resolve, isAbsolute } = require('path');
/**
 * @description: 文件操作相关
 * @param1: param
 * @param2: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:30:16
 */
module.exports = {
  createFileSync: function (filePath, txt) {
    fs.writeFileSync(filePath, txt, function (err) {
      if (err) {
        console.log(colors.grey(err));
      }
    });
  },
  createWriteStream: function (filePath) {
    const stream = fs.createWriteStream(filePath);
    return stream;
  },
  readFileSync: function (filePath) {
    const txt = fs.readFileSync(filePath, 'utf8');
    return txt;
  },
  existsSync: function (filePath) {
    return fs.existsSync(filePath);
  },
  mkdir: function (path) {
    fs.mkdirSync(path, 0777);
  },
  getCurFilePath: function (relativePath) {
    const curDirPath = process.cwd();
    return resolve(curDirPath, relativePath);
  },
  isAbsolute: function (curPath) {
    if (isAbsolute(curPath)) {
      return curPath;
    }
    return resolve(appDirectory, curPath);
  },
};
