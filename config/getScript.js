const webpack = require('webpack');
const paths = require('./defaultPaths');
let assetObj = require(paths.appAsset);

module.exports=function(){
    //console.log(assetObj,'assetObj');
    let {keys, values, entries} = Object;
    let script='';
    for (let key of keys(assetObj)) {
        script+=`<script src="/dll/${assetObj[key].js}"></script>\n`;
    }
    return script;
}