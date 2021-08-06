#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');
const { program } = require('commander');
const pkg = require('./package.json');

program.description('ko lint tools').version(pkg.version, '-v --version');

program
  .command('prettier')
  .alias('pr')
  .description('use prettier to format your codes')
  .option('-c, --config <path>', 'set prettier config path')
  .action(opts => {
    console.log(opts);
  });

program
  .command('eslint')
  .alias('es')
  .description('use eslint to format your codes')
  .option('-c, --config <path>', 'set eslint config path')
  .action(opts => {});

program.parse();


