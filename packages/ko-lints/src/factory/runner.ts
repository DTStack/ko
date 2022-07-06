import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { cpus } from 'os';
import { performance } from 'perf_hooks';
import fg, { Pattern } from 'fast-glob';
import MultiThreading from '../threads';
import Parser from '../factory/parser';
import { IChildOpts, IOpts } from '../interfaces';

abstract class LintRunnerFactory {
  private opts: IOpts;
  private childOpts: IChildOpts;
  private parser: Parser;
  private cwd = process.cwd();
  constructor(opts: IOpts, childOpts: IChildOpts) {
    this.opts = opts;
    this.childOpts = childOpts;
    this.parser = childOpts.parser;
  }

  protected async getEntries(
    patterns: Pattern[],
    ignoreFiles: string[]
  ): Promise<string[]> {
    return fg(patterns, {
      dot: true,
      ignore: this.getIgnorePatterns(...ignoreFiles),
    });
  }

  private getIgnorePatterns(...ignoreFiles: string[]) {
    return ['.gitignore', ...ignoreFiles]
      .map(fileName => {
        const filePath = join(this.cwd, fileName);
        if (existsSync(filePath)) {
          return readFileSync(filePath, 'utf-8')
            .split('\n')
            .filter(str => str && !str.startsWith('#'));
        }
        return [];
      })
      .reduce((acc, current) => {
        current.forEach(p => {
          if (!acc.includes(p)) {
            acc.push(p);
          }
        });
        return acc;
      }, []);
  }

  protected getConcurrentNumber(num?: number) {
    return num ? num : cpus().length;
  }

  private async run(entries: string[]) {
    let ret: string[];
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
      name: this.childOpts.name,
    });
    return threads.batch();
  }

  private async runInNormalMode(entries: string[]) {
    const pList = entries.map(async file => await this.parser.format(file));
    const result = await Promise.all(pList);
    return result.filter(Boolean);
  }

  public async start() {
    const { patterns } = this.opts;
    const { ignoreFiles, name } = this.childOpts;
    const entries = await this.getEntries(patterns, ignoreFiles);
    const totalCount = entries.length;
    if (entries.length === 0) {
      console.log(`No files matched with pattern:${patterns} via ${name}`);
      process.exit(0);
    }
    const startTime = performance.now();
    const ret = await this.run(entries);
    const endTime = performance.now();
    console.log(
      `exec ${name} with ${totalCount} files cost ${(
        (endTime - startTime) /
        1000
      ).toFixed(2)}s`
    );
    return ret;
  }
}

export default LintRunnerFactory;
