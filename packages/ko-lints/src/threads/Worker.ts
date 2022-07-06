import { workerData, parentPort } from 'worker_threads';
import ESLintParser from '../eslint/parser';
import { IParserOpts } from '../interfaces';

const parser = new ESLintParser(workerData.opts as IParserOpts);

parentPort?.on('message', async (file: string) => {
  const result = await parser.format(file);
  parentPort?.postMessage(result);
});
