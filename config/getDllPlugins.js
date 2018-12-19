const webpack = require('webpack');
const paths = require('./defaultPaths');
let assetObj = require(paths.appAsset);
module.exports = function () {
    let plugins = [];
 
    let {keys, values, entries} = Object;
    for (let key of keys(assetObj)) {
        console.log(paths.resolveApp(`dist/dll/${key}-manifest.json`),'dll-manifest');
        plugins.push( 
            new webpack.DllReferencePlugin({
            context: paths.appDirectory, // 与DllPlugin中的那个context保持一致
            manifest:paths.resolveApp(`dist/dll/${key}-manifest.json`)
        }))
    }
    return plugins;
}