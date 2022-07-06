import { performance } from 'perf_hooks';
import ESLintParser from './parser';
import LintRunnerFactory from '../factory/runner';
import MultiThreading from '../threads';
import { IOpts, IRet } from '../interfaces';

class ESLintRunner extends LintRunnerFactory {
  static readonly IGNORE_FILES = ['.eslintignore'];
  static readonly NAME = 'eslint';
  private opts: IOpts;

  constructor(opts: IOpts) {
    super();
    this.opts = opts;
  }

  private async run(entries: string[]) {
    let ret: IRet;
    const { concurrency } = this.opts;
    if (concurrency) {
      ret = await this.runInConcurrencyMode(entries);
    } else {
      ret = await this.runInNormalMode(entries);
    }
    return ret;
  }

  private async runInConcurrencyMode(entries: string[]) {
    const { concurrentNumber, write, configPath } = this.opts;
    const threads = new MultiThreading({
      entries,
      concurrentNumber: this.getConcurrentNumber(concurrentNumber),
      write,
      configPath,
    });
    return threads.batch();
  }

  private async runInNormalMode(entries: string[]) {
    const { configPath, write } = this.opts;
    const parser = new ESLintParser({
      configPath,
      write,
    });
    const pList = entries.map(async file => await parser.format(file));
    const result = await Promise.all(pList);
    return result.filter(Boolean);
  }

  public async start() {
    const { patterns } = this.opts;
    const entries = await this.getEntries(patterns, [
      ...ESLintRunner.IGNORE_FILES,
    ]);
    const totalCount = entries.length;
    if (totalCount === 0) {
      console.log(
        `No files matched with pattern:${patterns} via ${ESLintRunner.NAME}`
      );
      process.exit(0);
    }
    const startTime = performance.now();
    const ret = await this.run(entries);
    const endTime = performance.now();
    console.log(
      `exec eslint with ${totalCount} files cost ${(
        (endTime - startTime) /
        1000
      ).toFixed(2)}s`
    );
    return ret;
  }
}

export default ESLintRunner;
