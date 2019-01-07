const paths = require('./defaultPaths');
const webpackMerge = require('webpack-merge');
const {existsSync}=require("../util/fileService");
const userConf=require('./getUserConf')();
const defaultPublicPath={
    output: {
        publicPath: "/"
    }
}
const publicPath=webpackMerge(defaultPublicPath,userConf.webpack).output.publicPath;
const isProd=process.env.NODE_ENV=='production';
module.exports={
    getConfJsPath:()=>{
        let confFile=isProd?'conf.prod.js':'conf.dev.js';
        let isAbsFile=`${paths.appConfig}/${confFile}`;
        let conf='';
       if(existsSync(isAbsFile)){
        conf=`<script src="${publicPath}config/${confFile}"></script>`
       }
       return conf;
    },
    getDllJsPath:()=>{
        let assetObj = require(paths.appAsset);
        let {keys} = Object;
        let script='';
        for (let key of keys(assetObj)) {
            script+=`<script src="${publicPath}dll/${assetObj[key].js}"></script>\n`;
        }
        return script;
    }
}