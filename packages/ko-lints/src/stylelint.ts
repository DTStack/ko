import { stylelint } from 'ko-lint-config';
import LintRunnerFactory from './factory';
import { IOpts } from './interfaces';

const { lint, formatters } = stylelint;

class StyleLintRunner extends LintRunnerFactory {
  static readonly EXTENSIONS = ['css', 'less', 'sass', 'scss'];
  static readonly IGNORE_FILES = ['.stylelintignore'];
  static readonly NAME = 'stylelint';
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
      const localConfigPath = this.detectLocalRunnerConfig(
        StyleLintRunner.NAME
      );
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
    if (entries.length === 0) {
      console.log(
        `No files matched with pattern:${patterns} via ${StyleLintRunner.NAME}`
      );
      process.exit(0);
    }
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
        return [];
      }
    } catch (ex) {
      console.error(ex);
      process.exit(1);
    }
  }
}

export default StyleLintRunner;
