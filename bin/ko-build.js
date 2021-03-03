#!/usr/bin/env node

'use strict';
const { program } = require('../util/program');
const attachToEnv = require('../util/attachToEnv');
const colors = require('colors');
const build = require('../script/build');

program
  .option('--hash', 'output file name with hash')
  .option('-t,--ts,--typescript', 'support build typescript file')
  .option('-e, --env [env]', 'user defined building environment')
  .option('--enable-dll', '开启dll支持')
  .parse(process.argv);
attachToEnv(program);
try {
  build(program);
} catch (err) {
  console.log(colors.red(err, 'try yarn'));
}
