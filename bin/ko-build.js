#!/usr/bin/env node

'use strict';
const program = require('commander');
const log=console.log;
const attachToEnv = require('../util/attachToEnv');
const colors = require('colors');
const build = require('../script/build');

program
  .option('--hash', '构建后的资源带 hash 版本')
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
 
