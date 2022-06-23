import { ESLint } from 'eslint';
import LintRunnerFactory from './factory';
import { IOpts } from './interfaces';

class ESlintRunner extends LintRunnerFactory {
  static readonly EXTENSIONS = ['ts', 'tsx', 'js', 'jsx'];
  static readonly IGNORE_FILES = ['.eslintignore'];
  static defaultConfigPath = 'ko-lint-config/.eslintrc';
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
      this.config = require(ESlintRunner.defaultConfigPath);
    }
  }

  public async start() {
    const { write, patterns } = this.opts;
    const entries = await this.getEntries(patterns, [
      ...ESlintRunner.IGNORE_FILES,
    ]);
    const eslint = new ESLint({
      fix: write,
      overrideConfig: this.config,
      useEslintrc: false,
      extensions: ESlintRunner.EXTENSIONS,
    });
    try {
      const formatter = await eslint.loadFormatter();
      const eslintFilesPromises = entries.map(async file => {
        const result = await eslint.lintFiles(file);
        if (result[0].errorCount) {
          const resultText = formatter.format(result) as string;
          this.stdout.push(resultText);
          return false;
        }
        return true;
      });
      const result = await Promise.all(eslintFilesPromises);
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

export default ESlintRunner;
