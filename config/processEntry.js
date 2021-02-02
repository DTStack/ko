/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-12 14:44:17
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:24:40
 */
const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
// const hotDevClientPath = require.resolve('react-dev-utils/webpackHotDevClient');

function entryWithApp(entry) {
  if (typeof entry === 'string') {
    if (path.isAbsolute(entry)) {
      return entry;
    }
    return path.resolve(appDirectory, entry);
  } else if (Array.isArray(entry)) {
    return entry.map((file) => entryWithApp(file));
  }
}

function unshiftEntryChunk(entry, chunk) {
  if (typeof entry === 'string') {
    return [chunk, entry];
  } else if (Array.isArray(entry)) {
    return [chunk, ...entry];
  }
}

function enhanceEntries(entries, chunk) {
  const hotEntries = {};

  Object.keys(entries).forEach((key) => {
    hotEntries[key] = unshiftEntryChunk(entries[key], chunk);
  });

  return hotEntries;
}
/**
 * @description: 实时监测文件变化
 * @param2: 入口文件对象
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:24:00
 */
module.exports = (entry) => {
  // 需要区分项目类型，新版的项目直接返回 src/index.js
  let entries = {};
  if (Array.isArray(entry) || typeof entry === 'string') {
    entries = {
      index: entryWithApp(entry),
    };
  } else {
    Object.keys(entry).forEach((key) => {
      entries[key] = entryWithApp(entry[key]);
    });
  }
  //from offical docs:
  //This is an alternative client for WebpackDevServer that shows a syntax error overlay.
  //It currently supports only webpack 3.x.
  //而且这里的处理逻辑有问题，在开发服和测试服部署的时候会将hotDevClientPath引入到第一位，而且不管是不是Vue环境，目前暂时删除，可以在各自的项目中自行引用
  // if (process.env.NODE_ENV !== 'production') {
  //   entries = enhanceEntries(entries, hotDevClientPath);
  // }  
  return entries;
};
