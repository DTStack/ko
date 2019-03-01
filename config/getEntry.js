/*
 * @Description: 设置默认入口文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-11 10:59:01
 * @LastEditors: Charles
 * @LastEditTime: 2019-03-01 15:35:41
 */

const { getCurFilePath,existsSync } = require('../util/fileService');
const shell = require('shelljs');
const getUserConf = require('./getUserConf');
const colors = require('colors');

function exit() {
   let tips = [
      `   \n${colors.red("error ")}${colors.yellow("入口文件有误，请检查后再运行")}`
   ];
   console.log(tips.join('\n'));
   process.exit(500);
}
module.exports = function (program) {
   let result = {
      entry: {},
      webpack: {}
   };
   const userConfig = getUserConf();
   const {
      webpack = {}
   } = userConfig;
   result.webpack = webpack;
   if (Object.keys(webpack.entry || {}).length) {
      result.entry = webpack.entry
   } else {
      if (!program.ts) {
         let entryJs = getCurFilePath('src/index.js');
         if (existsSync(entryJs)) {
            result.entry = {
               index: entryJs
            }
         } else {
            exit()
         }
      } else {
         let entryTs = getCurFilePath('src/index.tsx');
         if (existsSync(entryTs)) {
            let tsConf = getCurFilePath('tsconfig.json');
            if (!existsSync(tsConf)) {
               shell.cp('-R', require.resolve('../template/tsconfig.json'), process.cwd());
            }
            result.entry = {
               index: entryTs
            }
         } else {
            exit()
         }
      }
   }
   //  
   return result;
}