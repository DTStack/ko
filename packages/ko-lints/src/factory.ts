import { isAbsolute, join } from 'path';
import { existsSync, readFileSync } from 'fs';
import assert from 'assert';
import fg, { Pattern } from 'fast-glob';

abstract class LintRunnerFactory {
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
          return readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
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

  protected async getConfigFromFile(
    filepath: string
  ): Promise<Record<string, any>> {
    assert(isAbsolute(filepath), 'only accept absolute config filepath');
    return require(filepath);
  }
  public abstract generateConfig(): any;
  public abstract start(): Promise<true | string[]>;
}

export default LintRunnerFactory;
