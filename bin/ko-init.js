#! /usr/bin/env node

'use strict';
const program = require('commander');
const colors = require('colors');
const init=require('../script/init');
const log = console.log;
program
  .parse(process.argv);

  try{
    init();
  }catch(err){
    log(colors.red)('服务启动失败，请检查package中dependencies依赖包');
  }