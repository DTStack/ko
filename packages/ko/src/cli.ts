#!/usr/bin/env node
'use strict';

import { Command } from 'commander';
import lint from 'ko-lint';

const program = new Command();
const pkg = require('../package.json');

program
  .description('build & lint library')
  .version(pkg.version, '-v, --version')
  .usage('<command> [options]');

program
  .command('build')
  .description('build project')
  .option('--hash', 'output file name with hash')
  .option('-t,--ts,--typescript', 'support typescript')
  .option('-e, --env [env]', 'user defined building environment')
  .action(opts => { });

program
  .command('dev')
  .description('start devServer')
  .option('-p, --port <port>', 'server start on which port', parseInt)
  .option('--host <host>', 'specify a host to use')
  .option('-t, --ts', 'support typescript')
  .option('-a,--analyzer', 'support building analyzer')
  .action(opts => { });

//attach lint features to program
lint(program);

program.parse();
