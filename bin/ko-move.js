#!/usr/bin/env node

'use strict';
const program = require('commander');
const colors = require('colors');
const move = require('../script/move');

program.option('-d, --dir <dir>', '自定义目录名').parse(process.argv);

try {
  move();
} catch (err) {
  console.log(colors.red('移动文件失败，请重试。'));
}
