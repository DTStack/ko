import { isAbsolute, join } from 'path';
import { readdirSync, statSync } from 'fs';
import assert from 'assert';
import { IRet } from '../interfaces';

abstract class LintParserFactory {
  public abstract format(file: string): Promise<string>;
  protected abstract generateConfig(): any;
  private cwd = process.cwd();

  protected getConfigFromFile(filepath: string): Promise<Record<string, any>> {
    assert(isAbsolute(filepath), 'only accept absolute config filepath');
    return require(filepath);
  }

  protected detectLocalRunnerConfig(name: string): string {
    const files = readdirSync(this.cwd).filter(
      path => !statSync(path).isDirectory()
    );
    let ret: string = '';
    for (let file of files) {
      if (file.includes(name) && !file.includes('ignore')) {
        ret = file;
        break;
      }
    }
    return ret ? join(this.cwd, ret) : ret;
  }
}

export default LintParserFactory;
