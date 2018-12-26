#!/usr/bin/env node
/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-19 15:31:48
 * @LastEditors: Charles
 * @LastEditTime: 2018-12-26 11:36:02
 */
'use strict';
const program = require('commander');
const log=console.log;
const attachToEnv = require('../util/attachToEnv');
const colors = require('colors');
const preview = require('../script/preview');

program
  .option('-p, --port <port>', '预览端口号')
  .parse(process.argv);
  attachToEnv(program);
  
  try{
    preview();
  }catch(err){
    log(colors.red)('启动失败，请检查端口是否被占用');
  }
 
