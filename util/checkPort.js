const detect = require('detect-port');
const inquirer = require('inquirer');
const isInteractive = process.stdout.isTTY;
  async function  checkPort(defaultPort){
    let newPort= await detect(defaultPort);
     if (newPort === defaultPort) {
        return newPort ;
     }
     if (isInteractive) {
      return changePort(newPort,defaultPort);
     }
   }

   async function changePort(newPort,defaultPort){
    const question = {
        type: 'confirm',
        name: 'changePort',
        message: `${defaultPort} 端口已被占用，是否使用${newPort}端口启动？`,
        default: true,
      };
     let answer=await inquirer.prompt(question);
      if(answer.changePort){
          return newPort;
      }
      else{
          return null;
      }
   }

   module.exports=checkPort;