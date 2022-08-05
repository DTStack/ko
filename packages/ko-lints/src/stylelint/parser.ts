import { stylelint } from 'ko-lint-config';
import LintParserFactory from '../factory/parser';
import { IParserOpts } from '../interfaces';

const { lint, formatters } = stylelint;

class StyleLintParser extends LintParserFactory {
  private opts: IParserOpts;
  private config: Record<string, any>;
  constructor(opts: IParserOpts) {
    super();
    this.opts = opts;
    this.generateConfig();
  }

  public generateConfig() {
    if (this.opts.configPath) {
      this.config = this.getConfigFromFile(this.opts.configPath);
    } else {
      const localConfigPath = this.detectLocalRunnerConfig(this.opts.name);
      if (localConfigPath) {
        this.config = this.getConfigFromFile(localConfigPath);
      }
    }
  }

  public async format(file: string): Promise<string> {
    const { write } = this.opts;
    let resultText = '';
    try {
      const result = await lint({
        fix: write,
        config: this.config,
        files: file,
      });
      if (result.errored) {
        resultText = formatters.string(result.results);
      }
      return resultText;
    } catch (ex) {
      console.error(ex);
      process.exit(1);
    }
  }
}

export default StyleLintParser;
