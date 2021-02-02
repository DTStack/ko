#!/usr/bin/env node

'use strict';

const program = require('commander');

const pkg = require('../package.json');

program
  .version(pkg.version,'-v, --version')
  .usage('<command> [options]')
  .command('init', 'init scaffold')
  .command('create', 'create webcomponent')
  .command('build', 'build project')
  .command('dev', 'start server')
  .command('dll', 'build dll')
  .command('preview', 'browser app')
  .command('install', 'install commponent')
  .command('move', 'move to gh-pages')
  .command('swagger','generate swagger api')
  .command('createPage','create page and config router')
  .command('createComp','create component')
  .command('lint', 'lint precommit files');
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