/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-18 14:11:26
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:19:25
 */
const webpack = require('webpack');
const paths = require('./defaultPaths');

/**
 * @description: 根据生成的bound.json ，设置dll脚本文件
 * @param1: param
 * @param2: param
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:18:49
 */
module.exports=function(){
    let assetObj = require(paths.appAsset);
    let {keys} = Object;
    let script='';
    for (let key of keys(assetObj)) {
        script+=`<script src="/dll/${assetObj[key].js}"></script>\n`;
    }
    return script;
}