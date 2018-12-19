const {getCurFilePath}=require('../util/index');
module.exports=function(){
   return getCurFilePath('src/index.js');;
}