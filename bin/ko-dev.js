#! /usr/bin/env node
'use strict';

const colors = require('colors');
const { program } = require('../util/program');
const { inProcess } = require('../util/stdout');
const attachToEnv = require('../util/attachToEnv');
const dev = require('../script/dev');

program
  .option('-p, --port <port>', 'server start on which port', parseInt)
  .option('--host <host>', 'specify a host to use')
  .option('-t, --ts', 'typescript support')
  .option('-a,--analyzer', 'support building analyzer')
  .parse(process.argv);
attachToEnv(program);

try {
  const inProcessConf = {
    initStr: 'ko dev server start!',
    spinStr: 'compiling...',
    spinColor: 'yellow',
    process: dev,
  };
  inProcess(inProcessConf);
} catch (err) {
  console.log(colors.red('process init failed:'), err);
}
