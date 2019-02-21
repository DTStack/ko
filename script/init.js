/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2019-01-07 17:06:53
 * @LastEditors: Charles
 * @LastEditTime: 2019-02-21 14:55:09
 */


const colors = require('colors');
const download=require('download-git-repo');
const paths=require('path');
const log=console.log;
const ora=require('ora')
const shell = require('shelljs');
const inquirer=require('inquirer')
const {existsSync}=require('../util/fileService')
const {get}=require('../util/request')
const {scaffoldConfUrl,userCacheRepoDir} = require('../config/defaultPaths');


async function getKoScriptConf(){
   return  get({},scaffoldConfUrl);
}

async function inquirerAnswer(inquireType){
  let ret=inquirer.prompt([inquireType]);
  return ret;
}


/**
 * @description: 初始化脚手架
 * @param1: param
 * @param2: param
 * @return: ret
 * @Author: Charles
 * @Date: 2019-01-08 16:48:38
 */
async function initScaffold(tempRepo){
    let curPath=process.cwd();
    let inquireProject={
        type:'input',
        name:'name',
        message:'please input the name of project',
        default:'ko-project'
      }
    let projectRet=await inquirerAnswer(inquireProject);
    let dest=`${curPath}/${projectRet.name}`;
    shell.rm('-rf', dest);
    shell.mkdir('-p', dest);
    const spinner = ora('generating project...');
    spinner.start()
    shell.cp('-rf', `${tempRepo}/*`,dest);
    spinner.stop()
    log(
    [
        `  - tip:   ${colors.yellow("scaffold init success")}`,
        
        `  - tip:   ${colors.yellow(`The address of project is  ${dest}`)}`,

    ].join('\n'));
}
/**
 * @description:下载脚手架
 * @param1: param
 * @param2: param
 * @return: ret
 * @Author: Charles
 * @Date: 2019-01-08 16:49:19
 */
function downScaffold(gitRepo,tempRepo){
    const spinner=ora('downloading scaffold...');
    spinner.start();
    download(gitRepo, tempRepo, { clone: false }, function (err) {
        if(err){
            log([
                `    - tip:   ${colors.yellow("scaffold Download failed ,please try it")}`
           ].join('\n'));
        }else{
            spinner.succeed(colors.green('download scaffold successfully'))
            initScaffold(tempRepo);
        }
       
      })
}
module.exports =async (program) => {
   let ret= await getKoScriptConf();
   const choices=(ret||[]).map(item=>{
    return {
      name:`${item.name} - ${item.description}`,
      value:`${item.name}|${item.url}#ko-script`
    }
   });
   let inquireScaffold={
    type:'list',
    name:'scaffold',
    choices,
    message:'choose scaffold you want'
   };
   let scaffoldRet=await inquirerAnswer(inquireScaffold);
   let scaffoldInfo=scaffoldRet.scaffold.split('|');
   let gitRepo=scaffoldInfo[1],
       tempRepo=paths.join(userCacheRepoDir,scaffoldInfo[0]);
   if(existsSync(tempRepo)){
        let inquireConfirm=
        {
        type:'confirm',
        name:'override',
        message:'The scaffold exists.Override?'
        };
        let confirmRet=await inquirerAnswer(inquireConfirm);
        if(confirmRet.override){
            shell.rm('-rf', tempRepo);
            downScaffold(gitRepo,tempRepo);
        }else{
            initScaffold(tempRepo);
        }
    }else{
      downScaffold(gitRepo,tempRepo);
    }    
  }