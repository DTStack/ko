const PAGE_TEMPLATE_PATH = '../template/pageTemplate.mustache';
const STYLE_TEMPLATE_PATH = '../template/styleTemplate.mustache';
const ROUTERTC_TEMPLATE_PATH = '../template/routerConfTemplate.mustache';
const INDEX_N = 'index.js';
const STYLE_N = 'style.scss';
const ROUTERTC_N = 'routerConf.js';

const ROUTERTC_N_TS = 'routerConf.tsx';
const INDEX_TS_N = 'index.tsx';
const PAGE_TS_TEMPLATE_PATH = '../template/pageTemplateTS.mustache';

const Colors = require('colors');
const Log = console.log;
const fs = require('fs');
const Mustache = require('mustache');
const Path = require('path');
const _ = require('lodash');

const { resolveApp } = require('../config/defaultPaths');
const { existsSync, mkdir, readFileSync } = require('./fileService');

function toLine(str) {
  // 大驼峰转连字符 loginIn -> login-in
  let temp = str.replace(/[A-Z]/g, function (match) {
    return '-' + match.toLowerCase();
  });
  if (temp.slice(0, 1) === '-') {
    temp = temp.slice(1);
  }
  return temp;
}

function toCamel(str) {
  // 大驼峰转小驼峰 首字母转为小写
  return str[0].toLowerCase() + str.substring(1);
}

function writerFile(filePath, renderString) {
  // 生成指定文件并填入内容
  fs.writeFile(filePath, renderString, function (err) {
    if (err) Log(Colors.red('生成操作失败'));
    else Log(Colors.green(`生成操作成功,生成目录: ${filePath} `));
  });
}

function renderMustache(path, data) {
  // 渲染获取字符串
  const temp = fs.readFileSync(require.resolve(path), 'utf-8').toString();
  const renderString = Mustache.render(temp, data);
  return renderString;
}

function parseString(str) {
  // 解析文件内已有字符串
  const tempArr = str.trim().split('const routerConf = [');
  const importedPks = tempArr[0].split('\n');
  const importPackages = importedPks.filter((str) => {
    return str != '';
  });
  //   let initReg=/{(\n*.*)+}/g;
  //   let initStr=tempArr[1].match(initReg)[0];
  const index = tempArr[1].indexOf('];');
  const initStr = tempArr[1].substring(0, index + 1);
  return {
    initStr,
    importPackages,
  };
}

function mergeRouterCData(path, newData) {
  // 合并新旧数据
  const fileData = null;
  if (existsSync(path)) {
    let fileContent = readFileSync(path);
    console.time('test');
    fileContent = parseString(fileContent);
    console.timeEnd('test');
    newData.initRoutConf = fileContent.initStr; // importPackages: importedPks,
    const importPackages = [
      ...fileContent.importPackages,
      ...newData.importPackages,
    ];
    console.log(importPackages, 'importPackages');
    return {
      importPackages,
      ...newData,
    };
  }
}

module.exports = (compName, compPath, url, layoutName, isTs) => {
  const folderName = toCamel(compName); // 文件夹名称
  const className = toLine(compName); // 类名
  const folderPath = `${resolveApp(compPath)}/${folderName}`;
  const folderExist = existsSync(folderPath); // 文件夹是否存在

  const importPackages = [`import ${compName} from 'pages/${folderName}';`];

  if (folderExist) {
    Log(Colors.red(`指定路径下页面已存在，请重新输入页面名`));
  } else {
    // 生成文件
    mkdir(folderPath);
    const indexContent = renderMustache(
      isTs == 'y' ? PAGE_TS_TEMPLATE_PATH : PAGE_TEMPLATE_PATH,
      {
        name: compName,
        className,
      }
    );
    console.log(indexContent, 'indexContent');
    const styleContent = renderMustache(STYLE_TEMPLATE_PATH, {
      className,
    });
    writerFile(
      Path.join(folderPath, isTs == 'y' ? INDEX_TS_N : INDEX_N),
      indexContent
    );
    writerFile(Path.join(folderPath, STYLE_N), styleContent);

    // 配置路由
    const newConf = {
      importPackages,
      initRoutConf: '',
      linkPath: url == '' ? `/${className}` : url,
      layoutName,
      compName,
    };
    const routerCPath = resolveApp(
      isTs == 'y' ? `src/router/${ROUTERTC_N_TS}` : `src/router/${ROUTERTC_N}`
    );
    const allRouterConf = mergeRouterCData(routerCPath, newConf);
    console.log(allRouterConf, 'allRouterConf');
    const routerConfContent = renderMustache(
      ROUTERTC_TEMPLATE_PATH,
      allRouterConf
    );
    console.log(routerConfContent, 'routerConfContent');
    writerFile(routerCPath, routerConfContent);
  }
};
