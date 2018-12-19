
const { realpathSync } = require('fs');
const { resolve } = require('path');
module.exports={
    getCurDirPath:function(cwd){
       return realpathSync(cwd)
    },
    getCurFilePath:function(relativePath){
        let curDirPath=process.cwd();
        return resolve(curDirPath, relativePath);
    },
    formatBundle:function(data){
        let obj={},entryLen=Math.ceil(data.length/3)+1;
        for(let i=1;i<entryLen;i++){
            obj[`vendor_${i}`]=data.slice((i-1)*3,i*3);
        }
        return obj;
    },
    getUserServer:function(data){
       return data;
    },
    getUserWebpack:function(data){
        return data;
    }
}