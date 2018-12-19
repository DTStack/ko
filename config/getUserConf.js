const path = require('path');
const fs = require('fs');
const userConfFile = 'ko.config.json';
const { getCurFilePath } = require('../util');
function getUserConf () {
    let curFilePath = getCurFilePath(userConfFile);
    if (fs.existsSync(curFilePath)) {
        return require(curFilePath);
    } else {
        return {
            proxy:[],
            server:{},
            webpack:{}
        };
    }
}

module.exports = () => {
    const userConf=getUserConf();
    const {proxy={},server={},webpack={}}=userConf;
     return{
        proxy,
        server,
        webpack
     }
}