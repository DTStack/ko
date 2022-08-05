import StyleLintParser from './parser';
import LintRunnerFactory from '../factory/runner';
import { IOpts, IChildOpts } from '../interfaces';

class StyleLintRunner extends LintRunnerFactory {
  static readonly IGNORE_FILES = ['.stylelintignore'];
  static readonly NAME = 'stylelint';
  constructor(opts: IOpts) {
    const { configPath, write } = opts;
    const parser = new StyleLintParser({
      configPath,
      write,
      name: StyleLintRunner.NAME,
    });
    const childOpts: IChildOpts = {
      parser,
      name: StyleLintRunner.NAME,
      ignoreFiles: StyleLintRunner.IGNORE_FILES,
    };
    super(opts, childOpts);
  }
}

export default StyleLintRunner;
