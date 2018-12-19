const webpack = require('webpack');
const paths = require('./defaultPaths');

module.exports=function(){
    let assetObj = require(paths.appAsset);
    let {keys} = Object;
    let script='';
    for (let key of keys(assetObj)) {
        script+=`<script src="/dll/${assetObj[key].js}"></script>\n`;
    }
    return script;
}