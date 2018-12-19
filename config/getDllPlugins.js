const webpack = require('webpack');
const paths = require('./defaultPaths');
let assetObj = require(paths.appAsset);
module.exports = function () {
    let plugins = [];
    if(!existsSync(paths.appDll)){
        console.log(colors.red('请先执行 ko dll,生成dll文件，再执行ko build或者ko dev'));
        process.exit(500);
    }
    let {keys, values, entries} = Object;
    for (let key of keys(assetObj)) {
        plugins.push( 
            new webpack.DllReferencePlugin({
            context: paths.appDirectory, // 与DllPlugin中的那个context保持一致
            manifest:paths.appDll+`/${key}-manifest.json`
        }))
    }
    return plugins;
}