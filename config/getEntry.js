/*
 * @Description: 设置默认入口文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-11 10:59:01
 * @LastEditors: Charles
 * @LastEditTime: 2019-02-20 11:21:44
 */

const { getCurFilePath,existsSync } = require('../util/fileService');
const shell = require('shelljs');
module.exports = function (program) {
   let result={};
   if (!program.ts) {
      let entryJs = getCurFilePath('src/index.js');
      if (existsSync(entryJs)) {
         result={ index: entryJs }
      } 
   } else {
      let entryTs = getCurFilePath('src/index.tsx');
      if (existsSync(entryTs)) {
         let tsConf = getCurFilePath('tsconfig.json');
         if (!existsSync(tsConf)) {
            shell.cp('-R',  require.resolve('../template/tsconfig.json'), process.cwd());
         }
         result= { index: entryTs }
      }
   }
   return result;
}