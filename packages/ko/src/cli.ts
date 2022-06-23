#!/usr/bin/env node
'use strict';
import Service from './core/service';
import Dev from './actions/dev';
import Build from './actions/build';
import LintFactory from './actions/lints';
import { IKeys } from 'ko-lints';

function exec() {
  const service = new Service();
  // register commands
  const dev = new Dev(service);
  dev.registerCommand();
  const build = new Build(service);
  build.registerCommand();
  (['eslint', 'prettier', 'stylelint'] as IKeys[]).forEach(name => {
    const runner = new LintFactory(service, name);
    runner.registerCommand();
  });
  service.run();
}

exec();
