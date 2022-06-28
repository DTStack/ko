import { readFile, writeFile } from 'fs/promises';
import { format, check } from 'prettier';
import LintRunnerFactory from './factory';
import { IOpts } from './interfaces';

class PrettierRunner extends LintRunnerFactory {
  static readonly EXTENSIONS = ['ts', 'tsx', 'js', 'jsx', 'json'];
  static readonly IGNORE_FILES = ['.prettierignore'];
  private opts: IOpts;
  private config: Record<string, any>;
  private stdout: string[] = [];
  constructor(opts: IOpts) {
    super();
    this.opts = opts;
    this.generateConfig();
  }

  public generateConfig() {
    if (this.opts.configPath) {
      this.config = this.getConfigFromFile(this.opts.configPath);
    } else {
      const localConfigPath = this.detectLocalRunnerConfig('prettier');
      if (localConfigPath) {
        this.config = this.getConfigFromFile(localConfigPath);
      }
    }
  }

  public async start() {
    const { write, patterns } = this.opts;
    const entries = await this.getEntries(patterns, [
      ...PrettierRunner.IGNORE_FILES,
    ]);
    try {
      const formatFilesPromises = entries.map(async file => {
        const source = await readFile(file, 'utf-8');
        const opts = { ...this.config, filepath: file };
        if (write) {
          const formatContent = format(source, opts);
          await writeFile(file, formatContent, 'utf-8');
          return true;
        } else {
          if (check(source, opts)) {
            return true;
          } else {
            this.stdout.push(
              `file ${opts.filepath} doesn't match prettier config`
            );
            return false;
          }
        }
      });
      const result = await Promise.all(formatFilesPromises);
      if (result.includes(false)) {
        return this.stdout;
      } else {
        return true;
      }
    } catch (ex) {
      console.error(ex);
      process.exit(1);
    }
  }
}

export default PrettierRunner;
