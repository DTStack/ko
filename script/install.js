const path = require('path');
const { realpathSync } = require('fs');
const curDir = realpathSync(process.cwd());
const urllib = require('urllib');
const compressing = require('compressing');
const userHome = require('user-home');
const { existsSync, mkdir } = require('../util/fileService');
const shell = require('shelljs');
const colors = require('colors');
const inquirer = require('inquirer');
const log = console.log;

async function inquirerAnswer(inquireType) {
  const ret = inquirer.prompt([inquireType]);
  return ret;
}

const downPackage = (url, name, basePath, customPath) => {
  urllib
    .request(url, { streaming: true, followRedirect: true })
    .then((result) => compressing.tgz.uncompress(result.res, basePath))
    .then(() => {
      const sourceDir = `${basePath}/package/src`;
      moveTargetDir(name, sourceDir, customPath);
    })
    .catch(console.error);
};

const moveTargetDir = async (name, sourceDir, customPath) => {
  let targetDir = path.join(curDir, `src/components/${name}`);
  if (customPath) {
    targetDir = path.join(customPath, name);
  }
  const inquireProject = {
    type: 'confirm',
    name: 'name',
    message: `Are you sure to create directory about ${targetDir}?`,
  };
  const projectRet = await inquirerAnswer(inquireProject);
  if (projectRet.name) {
    if (!existsSync(targetDir)) {
      mkdir(targetDir);
    }
    console.log(sourceDir, targetDir);
    shell.cp('-rf', `${sourceDir}` + '/*', targetDir);
    log([`    - Tip:   ${colors.green('组件下载并安装成功')}`].join('\n'));
  }
};
const getPackageInfo = async (url_package) => {
  let result = {};
  await urllib
    .request(url_package, { dataType: 'json' })
    .then((ret) => {
      result = ret.data;
    })
    .catch(function (err) {
      console.error(err);
    });
  return result;
};
module.exports = async (program) => {
  const basePath = path.join(userHome, '.kangaroo/component');
  if (!existsSync(basePath)) {
    mkdir(basePath);
  }
  let [name, relativePath] = program.args;
  if (!name) {
    name = program.name;
  }
  if (!name) {
    log(
      [`    - Tip:   ${colors.red('请输入组件名称或通过-n指定组件名称')}`].join(
        '\n'
      )
    );
    return;
  }
  if (program.path) {
    relativePath = program.path;
  }
  // 获取包信息地址
  const registry = 'http://registry.npm.taobao.org';
  const url_package = `${registry}/${name}`;
  const package_info = await getPackageInfo(url_package);
  // 下去下载压缩包地址
  const fileName = `${name}-${package_info['dist-tags'].latest}.tgz`;
  const url_tgz = `${registry}/${name}/download/${fileName}`;
  const customPath = relativePath ? path.resolve(basePath, relativePath) : null;
  // console.log(url_tgz,name,basePath,customPath);
  downPackage(url_tgz, name, basePath, customPath);
};
