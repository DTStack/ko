const {createFileSync,readFileSync,existsSync}=require("./fileService");
module.exports=function(path){
    if (!existsSync(path)) {
        createFileSync(path,`
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <title>page</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body>
              <div id='root'></div>
              <div class="dll">
                  <%= htmlWebpackPlugin.options.scripts %>
              </div>
          </body>
          </html>
        `);
    }else{
        let txt=readFileSync(path);
        let reg=/htmlWebpackPlugin.options.scripts/;
        if(reg.test(txt)){
            return;
        }else{
            let insertTxt=
              `<div class="dll">
                    <%= htmlWebpackPlugin.options.scripts %>
               </div>`;
            txt=txt.replace(/(<\/body>([\s\S])*<\/html>)/g,`${insertTxt}\n$1`);
            createFileSync(path,txt);
        }
    }
}