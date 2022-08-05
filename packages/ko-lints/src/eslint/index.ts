import ESLintParser from './parser';
import LintRunnerFactory from '../factory/runner';
import { IOpts, IChildOpts } from '../interfaces';

class ESLintRunner extends LintRunnerFactory {
  static readonly IGNORE_FILES = ['.eslintignore'];
  static readonly NAME = 'eslint';

  constructor(opts: IOpts) {
    const { configPath, write } = opts;
    const parser = new ESLintParser({
      configPath,
      write,
      name: ESLintRunner.NAME,
    });
    const childOpts: IChildOpts = {
      parser,
      name: ESLintRunner.NAME,
      ignoreFiles: ESLintRunner.IGNORE_FILES,
    };
    super(opts, childOpts);
  }
}

export default ESLintRunner;
