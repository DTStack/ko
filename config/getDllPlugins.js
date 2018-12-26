/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-11 15:57:17
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:14:52
 */

const webpack = require('webpack');
const paths = require('./defaultPaths');
const colors=require('colors');
const {existsSync}=require('../util/fileService')
/**
 * @description: DllReferencePlugin文件名设置
 * @param1: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:14:26
 */
module.exports = function () {
    let plugins = [];
    if(!existsSync(paths.appDll)){
        console.log(
            [
              `    - tip:    ${colors.yellow("请先执行 ko dll,生成dll文件")}`,
              `    - tip:    ${colors.yellow("然后执行ko build或者ko dev")}`
            ].join('\n')
          );
        process.exit(500);
    }
    let assetObj = require(paths.appAsset);
    let {keys} = Object;
    for (let key of keys(assetObj)) {
        plugins.push( 
            new webpack.DllReferencePlugin({
            context: paths.appDirectory, // 与DllPlugin中的那个context保持一致
            manifest:paths.appDll+`/${key}-manifest.json`
        }))
    }
    return plugins;
}