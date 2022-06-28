import { eslint } from 'ko-lint-config';
import LintRunnerFactory from './factory';
import { IOpts } from './interfaces';

const { ESLint } = eslint;

class ESlintRunner extends LintRunnerFactory {
  static readonly EXTENSIONS = ['ts', 'tsx', 'js', 'jsx'];
  static readonly IGNORE_FILES = ['.eslintignore'];
  static readonly NAME = 'eslint';
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
      const localConfigPath = this.detectLocalRunnerConfig('eslint');
      if (localConfigPath) {
        this.config = this.getConfigFromFile(localConfigPath);
      }
    }
  }

  public async start() {
    const { write, patterns } = this.opts;
    const entries = await this.getEntries(patterns, [
      ...ESlintRunner.IGNORE_FILES,
    ]);
    if (entries.length === 0) {
      console.log(
        `No files matched with pattern:${patterns} via ${ESlintRunner.NAME}`
      );
      process.exit(0);
    }
    const eslintInstance = new ESLint({
      fix: write,
      overrideConfig: this.config,
      useEslintrc: false,
      extensions: ESlintRunner.EXTENSIONS,
    });
    try {
      const formatter = await eslintInstance.loadFormatter();
      const eslintFilesPromises = entries.map(async file => {
        const result = await eslintInstance.lintFiles(file);
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
