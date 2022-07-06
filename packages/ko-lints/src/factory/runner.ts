import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { cpus } from 'os';
import fg, { Pattern } from 'fast-glob';
import { IRet } from '../interfaces';

abstract class LintRunnerFactory {
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

  protected getConcurrentNumber(num?: number) {
    return num ? num : cpus().length;
  }
}

export default LintRunnerFactory;
