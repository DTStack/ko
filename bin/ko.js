#!/usr/bin/env node

'use strict';

const program = require('commander');

const pkg = require('../package.json');

program
  .version(pkg.version)
  .usage('<command> [options]')
  .command('init', 'init scaffold')
  .command('build', 'build project')
  .command('dev', 'start server')
  .command('dll', 'build dll')
  .command('preview', 'view app')
  .command('move', 'move to gh-pages')
<<<<<<< HEAD
  .command('ko-ts', 'move to gh-pages');
=======
  .command('swagger','analyse swagger');
>>>>>>> feature_v1.4.10_0128
  program.parse(process.argv);

const proc = program.runningCommand;

if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}

const subCmd = program.args[0];
if (!subCmd) {
  program.help();
}