#!/usr/bin/env node
'use strict';

const { program } = require('../util/program');
const pkg = require('../package.json');

program
  .description('building tools based on webpack')
  .version(pkg.version, '-v, --version')
  .usage('<command> [options]')
  .command('init', 'init scaffold')
  .command('create', 'create web component')
  .command('build', 'build project')
  .command('dev', 'start server')
  .command('dll', 'build dll')
  .command('preview', 'browser app')
  .command('install', 'install component')
  .command('move', 'move to gh-pages')
  .command('swagger', 'generate swagger api')
  .command('createPage', 'create page and config router')
  .command('createComp', 'create component')
  .command('lint', 'lint project files');

program.parse(process.argv);

const subCmd = program.args[0];
if (!subCmd) {
  program.help();
}
