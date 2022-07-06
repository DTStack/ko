import { eslint } from 'ko-lint-config';
import LintParserFactory from '../factory/parser';
import { IParserOpts } from '../interfaces';

class ESLintParser extends LintParserFactory {
  static readonly EXTENSIONS = ['ts', 'tsx', 'js', 'jsx'];
  private eslintInstance: eslint.ESLint;
  private opts: IParserOpts;
  private config: Record<string, any>;

  constructor(opts: IParserOpts) {
    super();
    this.opts = opts;
    this.generateConfig();
    this.initInstance();
  }

  private initInstance() {
    const { write } = this.opts;
    this.eslintInstance = new eslint.ESLint({
      fix: write,
      overrideConfig: this.config,
      useEslintrc: false,
      extensions: ESLintParser.EXTENSIONS,
    });
  }

  public async format(file: string): Promise<string> {
    const formatter = await this.eslintInstance.loadFormatter();
    let resultText = '';
    try {
      const result = await this.eslintInstance.lintFiles(file);
      if (result[0].errorCount) {
        resultText = formatter.format(result) as string;
      }
      return resultText;
    } catch (ex) {
      console.log(ex);
      process.exit(1);
    }
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
}

export default ESLintParser;
