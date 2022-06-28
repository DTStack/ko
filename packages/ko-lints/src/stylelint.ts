import { lint, formatters } from 'stylelint';
import LintRunnerFactory from './factory';
import { IOpts } from './interfaces';

class StyleLintRunner extends LintRunnerFactory {
  static readonly EXTENSIONS = ['css', 'less', 'sass', 'scss'];
  static readonly IGNORE_FILES = ['.stylelintignore'];
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
      const localConfigPath = this.detectLocalRunnerConfig('stylelint');
      if (localConfigPath) {
        this.config = this.getConfigFromFile(localConfigPath);
      }
    }
  }

  public async start() {
    const { write, patterns } = this.opts;
    const entries = await this.getEntries(patterns, [
      ...StyleLintRunner.IGNORE_FILES,
    ]);
    try {
      const result = await lint({
        fix: write,
        config: this.config,
        files: entries,
      });
      if (result.errored) {
        this.stdout = [formatters.string(result.results)];
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

export default StyleLintRunner;
