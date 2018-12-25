const {createFileSync,readFileSync,existsSync,mkdir}=require("./fileService");
const {appPublic}=require('../config/defaultPaths');
module.exports=function(path){
    if(!existsSync(appPublic)) mkdir(appPublic);
    let txt=`<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>page</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <%= htmlWebpackPlugin.options.assets.config %>
            </head>
            <body>
                <div id='root'></div>
                <div class="dll">
                    <%= htmlWebpackPlugin.options.assets.scripts %>
                </div>
            </body>
            </html>
        `;
    if (!existsSync(path)) {
        createFileSync(path,txt);
    }else{
        let txt=readFileSync(path);
        let reg_script=/htmlWebpackPlugin.options.assets.scripts/;
        let ret_config=/htmlWebpackPlugin.options.assets.config/
        if(!reg_script.test(txt)){
            let insertTxt=
            `<div class="dll">
                  <%= htmlWebpackPlugin.options.assets.scripts %>
             </div>`;
            txt=txt.replace(/(<\/body>([\s\S])*<\/html>)/g,`${insertTxt}\n$1`);
            createFileSync(path,txt);
        }else if(!ret_config.test(txt)){
            let insertTxt=` <%= htmlWebpackPlugin.options.assets.config %> `;
            txt=txt.replace(/(<\/head>([\s\S])*<\/html>)/g,`${insertTxt}\n$1`);
            createFileSync(path,txt);
        }
    }
}