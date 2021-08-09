#!/usr/bin/env node
'use strict';

import { program } from 'commander';
import { defaultPatterns } from './constants';
import { getTargetFiles } from './utils';
import { formatFilesWithPrettier } from './prettier';

const pkg = require('../package.json');

type Option = {
  patterns?: string;
  write?: boolean;
  configPath?: string;
}

program.description('ko lint tools').version(pkg.version, '-v --version');

program
  .command('prettier')
  .alias('pr')
  .description('use prettier to format your codes')
  .argument('[patterns]', 'set target [file/dir/glob]')
  .option('-w, --write', 'Edit files in-place. (Beware!)')
  .option('-c, --config <configPath>', 'set prettier config path')
  .action((opts: Option) => {
    let { patterns = defaultPatterns, write = true, configPath } = opts;
    const targetFiles = getTargetFiles(patterns);
    formatFilesWithPrettier(targetFiles, !write, configPath);
  });

program
  .command('eslint')
  .alias('es')
  .description('use eslint to format your codes')
  .option('-c, --config <path>', 'set eslint config path')
// .action(opts => {});

program.parse();


