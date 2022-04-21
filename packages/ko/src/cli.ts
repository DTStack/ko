#!/usr/bin/env node
'use strict';

import { Command } from 'commander';
import { Options } from './interfaces';
import build from './actions/build';
import dev from './actions/dev';

const program = new Command();
const pkg = require('../package.json');

program
  .description('Project toolkit base on webpack')
  .version(pkg.version, '-v, --version')
  .usage('<command> [options]');

program
  .command('build')
  .description('build project')
  .option('--hash', 'output file name with hash')
  .action((opts: Options) => {
    process.env.NODE_ENV = 'production';
    const buildInstance = new build(opts);
    buildInstance.action();
  });

program
  .command('dev')
  .description('start devServer')
  .option('--hash', 'output file name with hash')
  .option('--analyzer', 'support building analyzer')
  .action((opts: Options) => {
    process.env.NODE_ENV = 'development';
    const devInstance = new dev(opts);
    devInstance.action();
  });

program.parse();
