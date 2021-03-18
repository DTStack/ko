#! /usr/bin/env node

'use strict';
const program = require('commander');
const colors = require('colors');
const create = require('../script/create');
const log = console.log;
program.option('-f,--flag', '支持typescript模版').parse(process.argv);

try {
  create(program);
} catch (err) {
  log(colors.red)('创建失败，请检查参数是否有误。');
}
