#!/usr/bin/env node

'use strict';
const program = require('commander');
const log=console.log;
const attachToEnv = require('../util/attachToEnv');
const colors = require('colors');
const build = require('../script/build');

program
  .option('--hash', '构建后的资源带 hash 版本')
  .option('--debug', 'debug 模式下不压缩')
  .option('-t,--ts', '支持typescript')
  .option('-e,--es6', '支持typescript')
  .parse(process.argv);
  attachToEnv(program);
  try{
    build(program);
  }catch(err){
   log(colors.red(err,"try yarn"))
  }
 
