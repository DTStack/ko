#! /usr/bin/env node

'use strict';
const program = require('commander');
const attachToEnv = require('../util/attachToEnv');
const checkPort = require('../util/checkPort');
const dev = require('../script/dev');
const colors = require('colors');
const log = console.log;
program
  .option('-p, --port <port>', '服务端口号')
  .option('-h, --host <host>', '服务主机名')
  .option('--project-type <type>', '项目类型, node|web', /^(node|web)$/i, 'web')
  .parse(process.argv);
  attachToEnv(program); //当前终端命令假如环境变量，避免权限无法执行问题；

  try{
    dev(program);
  }catch(err){
    log(colors.red)('服务启动失败，请检查package中dependencies依赖包');
  }

//   const DEFAULT_PORT = program.port || process.env.PORT || 4444;
// const HOST = program.host || process.env.HOST || '0.0.0.0';
// const defaultPort = parseInt(DEFAULT_PORT, 10);
// //检查端口是否被占用；
// checkPort(defaultPort).then(port => {
//   try {
//     if (port) {
//       let params = Object.assign({}, program, {
//         port: parseInt(port, 10),
//         host: HOST,
//         devType: 'project',
//       });
//       dev(params);
//     } else {
//       log(colors.red('Please check whether the port is normal .'));
//       process.exit(500);
//     }
//   } catch (err) {
//     log(colors.red(err));
//     log(colors.red('ko exited unexpectedly'));
//   }
// });