#!/usr/bin/env node

'use strict';
const program = require('commander');
const log=console.log;
const attachToEnv = require('../util/attachToEnv');
const colors = require('colors');
const preview = require('../script/preview');

program
  .option(
    '--inject-babel <type>',
    '注入 babel 运行环境, Enum: polyfill|runtime',
    /^(polyfill|runtime)$/,
    'polyfill'
  )
  .parse(process.argv);
  attachToEnv(program);
  
  try{
    preview();
  }catch(err){
    log(colors.red)('启动失败，请检查端口是否被占用');
  }
 
