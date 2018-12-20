const {getCurFilePath,existsSync}=require('../util/fileService');
module.exports=function(){
   let filePath= getCurFilePath('src/index.js');
   if(existsSync(filePath)){
    return {index:filePath}
   }else{
      return {};
   }
}