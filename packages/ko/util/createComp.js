const PAGE_TEMPLATE_PATH = '../template/pageTemplate.mustache';
const PAGE_TS_TEMPLATE_PATH = '../template/pageTemplateTS.mustache';
const STYLE_TEMPLATE_PATH = '../template/styleTemplate.mustache';
const INDEX_TS_N = 'index.tsx';
const INDEX_N = 'index.js';
const STYLE_N = 'style.scss';

const Colors = require('colors');
const Log = console.log;
const fs = require('fs');
const Mustache = require('mustache');
const Path = require('path');

const { existsSync, mkdir } = require('./fileService');

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
  fs.writeFile(filePath, renderString, function (err) {
    if (err) Log(Colors.red('生成操作失败'));
    else Log(Colors.green(`生成操作成功,生成目录: ${filePath} `));
  });
}

/* 渲染获取字符串 */
function renderMustache(path, data) {
  const temp = fs.readFileSync(require.resolve(path), 'utf-8').toString();
  const renderString = Mustache.render(temp, data);
  return renderString;
}

module.exports = (compName, compPath, isTs) => {
  const folderName = toCamel(compName); // 文件夹名称
  const className = toLine(compName); // 类名
  const folderPath = `${compPath}/${folderName}`;
  const folderExist = existsSync(folderPath); // 文件夹是否存在
  if (folderExist) {
    Log(Colors.red(`指定路径下组件已存在，请重新输入组件名`));
  } else {
    mkdir(folderPath);
    const indexContent = renderMustache(
      isTs == 'y' ? PAGE_TS_TEMPLATE_PATH : PAGE_TEMPLATE_PATH,
      {
        name: compName,
        className,
      }
    );
    const styleContent = renderMustache(STYLE_TEMPLATE_PATH, {
      className,
    });
    writerFile(
      Path.join(folderPath, isTs == 'y' ? INDEX_TS_N : INDEX_N),
      indexContent
    );
    writerFile(Path.join(folderPath, STYLE_N), styleContent);
  }
};
