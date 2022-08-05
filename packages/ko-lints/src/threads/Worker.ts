import { workerData, parentPort } from 'worker_threads';
import Parser from '../factory/parser';
import { IParserOpts } from '../interfaces';

let parser: Parser;

switch ((workerData.opts as IParserOpts).name) {
  case 'eslint':
    const ESLintParser = require('../eslint/parser').default;
    parser = new ESLintParser(workerData.opts);
    break;
  case 'prettier':
    const PrettierParser = require('../prettier/parser').default;
    parser = new PrettierParser(workerData.opts);
    break;
  case 'stylelint':
    const StyleParser = require('../stylelint/parser').default;
    parser = new StyleParser(workerData.opts);
    break;
}

parentPort?.on('message', async (file: string) => {
  const result = await parser.format(file);
  parentPort?.postMessage(result);
});
