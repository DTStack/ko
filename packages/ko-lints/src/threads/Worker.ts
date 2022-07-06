import { join } from 'path';
import { workerData, parentPort } from 'worker_threads';
import format from '../eslint/format';

const configPath = join(process.cwd(), '.eslintrc.js');

const config = require(configPath);

format({
  write: workerData.write,
  config,
  extensions: ['ts', 'tsx', 'js', 'jsx'],
  entries: workerData.entries,
}).then(result => {
  parentPort?.postMessage({
    result,
  });
});
