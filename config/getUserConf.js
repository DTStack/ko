const path = require('path');
const fs = require('fs');
const userConfFile = 'ko.config.js';
const { getCurFilePath } = require('../util');
const webpack=require('webpack');
function getUserConf () {
    let curFilePath = getCurFilePath(userConfFile);
    if (fs.existsSync(curFilePath)) {
        return require(curFilePath)({webpack});
    } else {
        return {
            proxy:[],
            server:{},
            webpack:{},
            move:{}
        };
    }
}

module.exports = () => {
    const userConf=getUserConf();
    //console.log(userConf,'http://172.16.8.170/webapp.html#/home');
    const {proxy={},server={},webpack={},move={}}=userConf;
     return{
        proxy,
        server,
        webpack,
        move
     }
}