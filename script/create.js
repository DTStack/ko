const colors = require('colors');
const paths=require('path');
const log=console.log;
const ora=require('ora')
const shell = require('shelljs');
const inquirer=require('inquirer')
const defaultData=require("../util/defaultData");
const initComp = require('../util/createComp');
const initPage = require('../util/createPage');
async function inquirerAnswer(inquireType){
    let ret=inquirer.prompt([inquireType]);
    return ret;
  }

module.exports=async(program)=>{
    const choices=defaultData.createChoiceData;
    let inquireType={
        type:'list',
        name:'web',
        choices,
        message:'choose  you want to create'
    }

    let inquireRet= await inquirerAnswer(inquireType);
    let questions=inquireRet.web=='page'?defaultData.createPageData:defaultData.createComData;
    inquirer
    .prompt(questions)
    .then((answers) => {
        let reg=/^\/.*/;
        let path=reg.test(answers.path)?"."+answers.path:answers.path;
        inquireRet.web=='page'?initPage(answers.name, answers.path, answers.route, null, answers.ts):initComp(answers.name,path, answers.ts);
        //inquireRet.web=='page'?log(colors.green('\n后续版本叠加,开发中...')):initComp(answers.name,path, answers.ts);
    })

}
  