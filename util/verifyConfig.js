/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-25 19:40:39
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:31:56
 */
const {existsSync}=require("./fileService");
/**
 * @description: 根据系统环境 ，引入不同环境配置文件
 * @path: 配置文件路径
 * @return: ret
 * @Author: Charles
 * @Date: 2018-12-26 11:30:53
 */
module.exports=function(path){
    let confFile= process.env.NODE_ENV=='production'?'conf.prod.js':'conf.dev.js';
    let isAbsFile=`${path}/${confFile}`
   if(existsSync(isAbsFile)){
    return `<script src="/config/${confFile}"></script>`
   }else{
       return '';
   }
}