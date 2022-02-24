#!/usr/bin/env node
'use strict';

import { Command } from 'commander';
import lint from 'ko-lints';
import { Options } from './interfaces';
import build from './actions/build';
import dev from './actions/dev';

const program = new Command();
const pkg = require('../package.json');

program
  .description('Project toolkit base on webpack,babel,eslint and prettier.')
  .version(pkg.version, '-v, --version')
  .usage('<command> [options]');

program
  .command('build')
  .description('build project')
  .option('--hash', 'output file name with hash')
  .option('-t,--ts,--typescript', 'support typescript')
  .option('-e,--esbuild', 'enable esbuild')
  .action((opts: Options) => {
    const buildInstance = new build(opts);
    buildInstance.action();
  });

program
  .command('dev')
  .description('start devServer')
  .option('-p, --port <port>', 'server start on which port', parseInt)
  .option('--host <host>', 'specify a host to use')
  .option('-t, --ts', 'support typescript')
  .option('-a,--analyzer', 'support building analyzer')
  .action((opts: Options) => {
    process.env.NODE_ENV = 'development';
    const devInstance = new dev(opts);
    devInstance.action();
  });

//attach lint features to program
lint(program);

program.parse();
