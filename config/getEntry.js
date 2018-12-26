/*
 * @Description: 设置默认入口文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-11 10:59:01
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:15:38
 */

const {getCurFilePath,existsSync}=require('../util/fileService');
module.exports=function(){
   let filePath= getCurFilePath('src/index.js');
   if(existsSync(filePath)){
    return {index:filePath}
   }else{
      return {};
   }
}