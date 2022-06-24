#!/usr/bin/env node
'use strict';
import Service from './core/service';
import Dev from './actions/dev';
import Build from './actions/build';

function exec() {
  const service = new Service();
  // register commands
  const dev = new Dev(service);
  dev.registerCommand();
  const build = new Build(service);
  build.registerCommand();
  service.run();
}

exec();
