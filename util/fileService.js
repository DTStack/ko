const fs = require('fs');
const colors=require('colors')

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
    }
    
}
