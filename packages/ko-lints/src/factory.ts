import { isAbsolute, join } from 'path';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { cpus } from 'os';
import assert from 'assert';
import fg, { Pattern } from 'fast-glob';
import { IRet } from './interfaces';

abstract class LintRunnerFactory {
  public abstract generateConfig(): any;
  public abstract start(): Promise<IRet>;
  private cwd = process.cwd();
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

  protected getConcurrentNumber(num: number) {
    return num ? num : cpus().length;
  }

  protected getConfigFromFile(filepath: string): Promise<Record<string, any>> {
    assert(isAbsolute(filepath), 'only accept absolute config filepath');
    return require(filepath);
  }

  protected detectLocalRunnerConfig(name: string): string {
    const cwd = process.cwd();
    const files = readdirSync(cwd).filter(
      path => !statSync(path).isDirectory()
    );
    let ret: string = '';
    for (let file of files) {
      if (file.includes(name) && !file.includes('ignore')) {
        ret = file;
        break;
      }
    }
    return ret ? join(cwd, ret) : ret;
  }
}

export default LintRunnerFactory;
