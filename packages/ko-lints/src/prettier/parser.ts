import { readFile, writeFile } from 'fs/promises';
import { prettier } from 'ko-lint-config';
import LintParserFactory from '../factory/parser';
import { IParserOpts } from '../interfaces';

const { format, check } = prettier;

class PrettierParser extends LintParserFactory {
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
    const opts = { ...this.config, filepath: file };
    let resultText = '';
    try {
      const source = await readFile(file, 'utf-8');
      if (this.opts.write) {
        const formatContent = format(source, opts);
        await writeFile(file, formatContent, 'utf-8');
      } else {
        if (!check(source, opts)) {
          resultText = `file ${opts.filepath} doesn't match ${this.opts.name} config`;
        }
      }
      return resultText;
    } catch (ex) {
      console.log(ex);
      process.exit(1);
    }
  }
}

export default PrettierParser;
