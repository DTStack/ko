#!/usr/bin/env node
'use strict';
import Service from './core/service';
import Dev from './actions/dev';
import Build from './actions/build';

function exec() {
  const service = new Service();
  const dev = new Dev(service);
  const build = new Build(service);
  const opts = service.commander.opts();
  service.run('dev');
}

exec();
