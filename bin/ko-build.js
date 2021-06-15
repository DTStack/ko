#!/usr/bin/env node
'use strict';

// set NODE_ENV to production
const { PROD } = require('../constants/env');
process.env.NODE_ENV = PROD;

const colors = require('colors');
const { program, attachOptions } = require('../util/program');
const { inProcess } = require('../util/stdout');
const build = require('../script/build');

program
  .option('--hash', 'output file name with hash')
  .option('-t,--ts,--typescript', 'support typescript')
  .option('-e, --env [env]', 'user defined building environment')
  .parse(process.argv);

attachOptions(program);

try {
  const inProcessConf = {
    initStr: 'ko build start!',
    spinStr: 'building...',
    process: build,
  };
  inProcess(inProcessConf);
} catch (ex) {
  console.log(colors.red('ko build failed:', ex));
}
