#!/usr/bin/env node
'use strict';

import { Command } from 'commander';
import initKoLintCli from './index';

console.log(require('ko-config/eslint'));

const pkg = require('../package.json');
const program = new Command();

program.description('ko lint tools').version(pkg.version, '-v --version');

initKoLintCli(program);

program.parse();
