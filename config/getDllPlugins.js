const webpack = require('webpack');
const paths = require('./defaultPaths');
const colors=require('colors');
const {existsSync}=require('../util/fileService')
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