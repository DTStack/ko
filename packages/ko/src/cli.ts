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

program
  .command('build')
  .description('build project')
  .option('--hash', 'output file name with hash')
  .action((opts: Options) => {
    process.env.NODE_ENV = 'production';
    const buildInstance = new build(opts);
    buildInstance.action();
  });

program
  .command('dev')
  .description('start devServer')
  .option('--hash', 'output file name with hash')
  .option('--analyzer', 'support building analyzer')
  .action((opts: Options) => {
    process.env.NODE_ENV = 'development';
    const devInstance = new dev(opts);
    devInstance.action();
  });
