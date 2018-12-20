const fs = require('fs');
const colors=require('colors')
const {appDirectory}=require('../config/defaultPaths');
const { resolve,isAbsolute } = require('path');
module.exports={
    createFileSync:function(filePath,txt){
        fs.writeFileSync(filePath, txt, function(err) {
            if(err) {
               console.log(colors.grey(err));
            }
        });
    },
    readFileSync:function(filePath){
       let txt= fs.readFileSync(filePath,'utf8');
       return txt;
    },
    existsSync:function(filePath){
     return fs.existsSync(filePath);
    },
    getCurFilePath:function(relativePath){
        let curDirPath=process.cwd();
        return resolve(curDirPath, relativePath);
    },
    isAbsolute:function(curPath){
        if (isAbsolute(curPath)) {
            return curPath;
          }
        return resolve(appDirectory, curPath);
    }
}
