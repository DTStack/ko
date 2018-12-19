#!/usr/bin/env node

'use strict';
const program = require('commander');
const log=console.log;
const attachToEnv = require('../util/attachToEnv');
const colors = require('colors');
const build = require('../script/build');

program
  .option('--debug', 'debug 模式下不压缩')
  .option('--hash', '构建后的资源带 hash 版本')
  .option('--project-type <type>', '项目类型, node|web', /^(node|web)$/i, 'web')
  .option('-s, --skip-install', '跳过安装依赖')
  .option(
    '--inject-babel <type>',
    '注入 babel 运行环境, Enum: polyfill|runtime',
    /^(polyfill|runtime)$/,
    'polyfill'
  )
  .parse(process.argv);
  attachToEnv(program);
  try{
    build();
  }catch(err){
   log(colors.red(err,"try yarn"))
  }
 
