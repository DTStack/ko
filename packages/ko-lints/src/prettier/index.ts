import LintRunnerFactory from '../factory/runner';
import PrettierParser from './parser';
import { IOpts, IChildOpts } from '../interfaces';

class PrettierRunner extends LintRunnerFactory {
  static readonly IGNORE_FILES = ['.prettierignore'];
  static readonly NAME = 'prettier';

  constructor(opts: IOpts) {
    const { configPath, write } = opts;
    const parser = new PrettierParser({
      configPath,
      write,
      name: PrettierRunner.NAME,
    });
    const childOpts: IChildOpts = {
      parser,
      name: PrettierRunner.NAME,
      ignoreFiles: PrettierRunner.IGNORE_FILES,
    };
    super(opts, childOpts);
  }
}

export default PrettierRunner;
