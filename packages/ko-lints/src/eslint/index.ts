import { performance } from 'perf_hooks';
import LintRunnerFactory from '../factory';
import format from './format';
import WorkerPool from '../threads/Pool';
import { IOpts, IRet } from '../interfaces';

class ESlintRunner extends LintRunnerFactory {
  static readonly EXTENSIONS = ['ts', 'tsx', 'js', 'jsx'];
  static readonly IGNORE_FILES = ['.eslintignore'];
  static readonly NAME = 'eslint';
  private opts: IOpts;
  private config: Record<string, any>;

  constructor(opts: IOpts) {
    super();
    this.opts = opts;
    this.generateConfig();
  }

  public generateConfig() {
    if (this.opts.configPath) {
      this.config = this.getConfigFromFile(this.opts.configPath);
    } else {
      const localConfigPath = this.detectLocalRunnerConfig('eslint');
      if (localConfigPath) {
        this.config = this.getConfigFromFile(localConfigPath);
      }
    }
  }

  private async run(entries: string[]) {
    let ret: IRet;
    const { write, concurrency } = this.opts;
    if (concurrency) {
      const workerPool = new WorkerPool({
        concurrentNumber: this.getConcurrentNumber(
          this.config.concurrentNumber
        ),
        entries,
        write,
      });
      ret = await workerPool.start();
    } else {
      ret = await format({
        entries,
        write,
        config: this.config,
        extensions: ESlintRunner.EXTENSIONS,
      });
    }
    return ret;
  }

  public async start() {
    const { patterns } = this.opts;
    const entries = await this.getEntries(patterns, [
      ...ESlintRunner.IGNORE_FILES,
    ]);
    if (entries.length === 0) {
      console.log(
        `No files matched with pattern:${patterns} via ${ESlintRunner.NAME}`
      );
      process.exit(0);
    }
    const startTime = performance.now();
    const ret = await this.run(entries);
    const endTime = performance.now();
    console.log(
      `exec eslint with ${entries.length} files cost ${(
        (endTime - startTime) /
        1000
      ).toFixed(2)}s`
    );
    return [];
  }
}

export default ESlintRunner;
