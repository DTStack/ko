import LintRunnerFactory from './factory/runner';
import ESlintRunner from './eslint';
import PrettierRunner from './prettier';
import StyleLintRunner from './stylelint';

import { IOpts, IKeys } from './interfaces';

class Lints {
  private runner: LintRunnerFactory;
  private opts: IOpts;
  constructor(opts: IOpts) {
    this.opts = opts;
  }

  async run(key: IKeys) {
    switch (key) {
      case 'eslint':
        this.runner = new ESlintRunner(this.opts);
        break;
      case 'prettier':
        this.runner = new PrettierRunner(this.opts);
        break;
      case 'stylelint':
        this.runner = new StyleLintRunner(this.opts);
        break;
    }
    const result = await this.runner.start();
    return result;
  }
}

export default Lints;
