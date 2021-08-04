#! /usr/bin/env node
'use strict';

const colors = require('colors');
const { inProcess } = require('../util/stdout');
const lint = require('../script/lint');

// TODO: support user defined eslint & prettier config with cli options
try {
  const inProcessConf = {
    initStr: 'ko lint start!',
    spinStr: 'compiling...',
    process: lint,
  };
  inProcess(inProcessConf);
} catch (err) {
  console.log(colors.red('process init failed:'), err);
}
