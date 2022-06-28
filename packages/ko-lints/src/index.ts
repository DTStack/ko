import LintRunnerFactory from './factory';
import ESlintRunner from './eslint';
import PrettierRunner from './prettier';
import StyleLintRunner from './stylelint';

import { IOpts, IKeys } from './interfaces';

class Lints {
  private runner: LintRunnerFactory;
  private opts: IOpts;
  public state: 0 | 1; // 0: success 1: failed
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
    this.runner.generateConfig();
    const result = await this.runner.start();
    return result;
  }
}

export default Lints;
