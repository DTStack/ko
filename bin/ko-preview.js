#!/usr/bin/env node
/*
 * @Description: 文件
 * @version: 1.0.0
 * @Company: 袋鼠云
 * @Author: Charles
 * @Date: 2018-12-19 15:31:48
 * @LastEditors: Charles
 * @LastEditTime: 2019-11-21 09:51:47
 */
'use strict';
const program = require('commander');
const log = console.log;
const colors = require('colors');
const preview = require('../script/preview');

program
  .option('-p, --port <port>', '预览端口号')
  .option('-i, --ip <address>', '指定ip')
  .option('-d, --dist <dist>', '预览文件目录[相对路径 如./]')
  .parse(process.argv);

try {
  preview(program);
} catch (err) {
  log(colors.red('启动失败，请检查端口是否被占用' + err));
}
