/*
 *  @Description:  文件
 *  @version:  1.0.0
 *  @Company:  袋鼠云
 *  @Author:  xiuneng
 *  @Date:  2019-01-07  17:06:53
 * @LastEditors: Charles
 * @LastEditTime: 2019-02-20 16:36:10
 */

const Colors = require('colors');
const Log = console.log;
const fs = require('fs');
const { resolveApp, parsePath } = require('../config/defaultPaths');
const { get } = require('../util/request');
const { existsSync, mkdir } = require('../util/fileService');
const Mustache = require('mustache');
const Path = require('path');
const cloneDeep = require('lodash').cloneDeep;
const DEFAULT_FILE_NAME = 'swagger.js';
const DEFAULT_TS_FILE_NAME = 'swagger.ts';
const DEFAULT_TEMPLATE_PATH = '../template/restfulTemplate.mustache';
/**
 * @description 对象数组去重
 * @param {Array} arr
 */
const unique = (arr = []) => {
  const obj = {};
  const result = arr.reduce((item, next) => {
    obj[next.operationId]
      ? ''
      : (obj[next.operationId] = true && item.push(next));
    return item;
  }, []);
  return result;
};
/**
 * @description 字符串专成驼峰命名
 * @param {string} str
 */
const parseCamelCase = (str = '') => {
  const reg = /(?<=Using)[^,]*/;
  if (reg.test(str)) {
    let substr = str.match(reg)[0].toLowerCase();
    substr = substr.charAt(0).toUpperCase() + substr.substring(1);
    return str.replace(reg, substr);
  } else {
    return str;
  }
};
/**
 *
 * @param {string} url -url地址
 */
const getSwaggerPath = (url = '', prefixPath) => {
  return new Promise((resolve, reject) => {
    get({}, url)
      .then((res) => res[0].location)
      .then((res) => {
        prefixPath
          ? resolve(`${prefixPath.protocol}//${prefixPath.host}${res}`)
          : resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
/**
 * @description 用于合并两个数组对象
 * @param {Array} arr1
 * @param {Array} arr2
 */
const handleResolveArray = (arr1, arr2) => {
  arr2 = arr2.map((item) => {
    // 合并data数据
    const index = item.name + ' ' + item.description;
    const object = arr1.find((o) => o.name == index) || {};
    item.data = item.data.concat(object.data || []);
    return item;
  });
  // 去重
  arr2 = arr2.map((item) => {
    item.data = unique(item.data);
    return item;
  });
  return arr2;
};
/**
 * @description 反向解析字符串
 * @param {string} str
 */
const parseRenderString = (str) => {
  const parseArr = str
    .trim()
    .split('},')
    .filter((o) => o.trim() != '{' && o.trim() != '}' && o.trim());
  const result = [];
  let obj = {};
  const tagRegex = /(?<=(-------- )).*?(?=( --------)) /;
  const methodRegex = /(?<=method:(\s*)\')[^\',]*/;
  const urlRegex = /(?<=url:(\s*)(\`|\'|\"))[^(\`|\'|\"),]*/;
  const keyRegex = /[^:\`,]*/;
  const commentRegex = /(?<=\/\/)[^(\n)]*/;
  parseArr.forEach((item) => {
    if (tagRegex.test(item)) {
      result.push(obj);
      obj = {};
      obj.name = item.match(tagRegex)[0].trim();
      obj.description = '';
      obj.data = [];
    } else {
      try {
        const method = methodRegex.test(item)
          ? item.match(methodRegex)[0].trim()
          : '';
        const url = urlRegex.test(item) ? item.match(urlRegex)[0].trim() : '';
        const key = keyRegex.test(item) ? item.match(keyRegex)[0].trim() : '';
        const comment = commentRegex.test(item)
          ? item.match(commentRegex)[0].trim()
          : '';
        Array.isArray(obj.data) &&
          obj.data.push({
            path: url,
            operationId: key,
            summary: comment,
            method,
          });
      } catch (err) {
        Log(`${item}失败:`, err);
      }
    }
  });
  return result.filter((o) => JSON.stringify(o) != '{}');
};
/**
 *  处理并合并已存在的文件的内容
 *  @param {string}path-文件地址
 *  @param {Array<object>}data-需要合并的旧数据
 *  */
function handleFileData(path, data) {
  const fileContent = fs.readFileSync(path).toString();
  const contentRegex = /\{((?:[^{}]*\{[^{}]*\})*[^{}]*?)\}/;
  let fileResult = parseRenderString(fileContent.match(contentRegex)[0]);
  const interfaceData = handleResolveArray(fileResult, data); // 将已存在的文件数据内容和需要新添加的数据内容合并
  const renderString = renderMustache(interfaceData);
  fileResult = fileContent.replace(
    contentRegex,
    renderString.match(contentRegex)[0]
  ); // 将正文部分替换成合并的数据部分，非正文部分不变
  return fileResult;
}
/* 生成文件 */
function writerFile(filePath, renderString) {
  fs.writeFile(filePath, renderString, function (err) {
    if (err) Log(Colors.red('生成api文件操作失败'));
    else Log(Colors.green(`生成api文件操作成功,生成目录: ${filePath} `));
  });
}

/* 渲染获取字符串 */
function renderMustache(interfaceData) {
  const temp = fs
    .readFileSync(require.resolve(DEFAULT_TEMPLATE_PATH), 'utf-8')
    .toString();
  const renderString = Mustache.render(temp, { result: interfaceData });
  return renderString;
}

/* 根据接口类型分类 */
function sortByTags(paths, result) {
  const cloneResult = cloneDeep(result);
  Object.keys(paths).map((reqApi) => {
    const method = Object.keys(paths[reqApi])[0];
    const info = paths[reqApi][method];
    info.operationId = parseCamelCase(info.operationId);
    const object = cloneResult.find((o) => o.name == info.tags[0]);
    !/(?<=\{)[^\},]*/.test(reqApi) &&
      object.data.push({ ...info, path: reqApi, method });
  });
  return cloneResult;
}

/* 获取接口类型 */
function getTags(tags) {
  const result = [];
  tags.map((item) => {
    result.push({ name: item.name, description: item.description, data: [] });
  });
  return result;
}
/**
 * @param {string} path-swagger地址
 * @param {string} filePath-生成的api接口文件地址
 * @param {boolean} ts-是否生成ts文件
 */
module.exports = (path, filePath, ts = false) => {
  const parseUrl = parsePath(path);
  const requestSwaggerPath = `${parseUrl.protocol}//${parseUrl.host}/swagger-resources`;
  getSwaggerPath(requestSwaggerPath, parseUrl)
    .then((api) => {
      get({}, encodeURI(api))
        .then((res) => {
          const FILE_NAME = ts ? DEFAULT_TS_FILE_NAME : DEFAULT_FILE_NAME;
          const folderExist = existsSync(filePath); // 文件夹是否存在
          let interfaceData = getTags(res.tags);
          interfaceData = sortByTags(res.paths, interfaceData);
          const renderString = renderMustache(interfaceData);
          if (folderExist) {
            const fileExist = existsSync(Path.join(filePath, FILE_NAME));
            if (fileExist) {
              // 若文件存在,则处理内容
              const fileResult = handleFileData(
                Path.join(filePath, FILE_NAME),
                interfaceData
              );
              writerFile(Path.join(filePath, FILE_NAME), fileResult);
            } else {
              // 文件夹存在,但文件不存在
              writerFile(Path.join(filePath, FILE_NAME), renderString);
            }
          } else {
            // 文件夹不存在,则文件必不存在;
            try {
              mkdir(filePath);
              writerFile(Path.join(filePath, FILE_NAME), renderString);
            } catch (err) {
              Log(Colors.red(`请检查文件路径 ${filePath} 是否合法`));
            }
          }
        })
        .catch((err) => {
          Log(Colors.red('请检查Swagger地址是否包含特殊字符'));
        });
    })
    .catch((err) => {
      Log(Colors.red('请检查Swagger地址是否合法'));
    });
};
