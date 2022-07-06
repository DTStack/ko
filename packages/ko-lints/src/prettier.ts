import { readFile, writeFile } from 'fs/promises';
import { prettier } from 'ko-lint-config';
import LintRunnerFactory from './factory/runner';
import { IOpts } from './interfaces';

const { format, check } = prettier;

class PrettierRunner extends LintRunnerFactory {
  static readonly EXTENSIONS = ['ts', 'tsx', 'js', 'jsx', 'json'];
  static readonly IGNORE_FILES = ['.prettierignore'];
  static readonly NAME = 'prettier';
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
    if (entries.length === 0) {
      console.log(
        `No files matched with pattern:${patterns} via ${PrettierRunner.NAME}`
      );
      process.exit(0);
    }
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
        return [];
      }
    } catch (ex) {
      console.error(ex);
      process.exit(1);
    }
  }
}

export default PrettierRunner;
