const { realpathSync } = require('fs');
const { resolve } = require('path');
module.exports = {
  getCurDirPath: function (cwd) {
    return realpathSync(cwd);
  },
  getCurFilePath: function (relativePath) {
    const curDirPath = process.cwd();
    return resolve(curDirPath, relativePath);
  },
  formatBundle: function (data, s) {
    const obj = {};
    const entryLen = Math.ceil(data.length / s) + 1;
    for (let i = 1; i < entryLen; i++) {
      obj[`vendor_${i}`] = data.slice((i - 1) * s, i * s);
    }
    return obj;
  },
  getUserServer: function (data) {
    return data;
  },
  getUserWebpack: function (data) {
    return data;
  },
};
