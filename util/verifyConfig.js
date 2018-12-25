const {existsSync}=require("./fileService");
module.exports=function(path){
    let confFile= process.env.NODE_ENV=='production'?'conf.prod.js':'conf.dev.js';
    let isAbsFile=`${path}/${confFile}`
   if(existsSync(isAbsFile)){
    return `<script src="/config/${confFile}"></script>`
   }else{
       return '';
   }
}