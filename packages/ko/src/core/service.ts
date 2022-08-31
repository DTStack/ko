import Commander from './commander';
import Hooks from './hooks';
import Config from './config';
import { IOptions, ICliOptions, HOOK_KEY_SET, ACTION } from '../types';

class Service extends Hooks {
  public config: IOptions;
  public cliOpts: Partial<ICliOptions>;
  public commander: Commander;

  constructor() {
    super();
    this.commander = new Commander();
    this.config = new Config().generate();
    this.config.plugins &&
      this.config.plugins.forEach(p => {
        // MODIFY_WEBPACK only support UPDATE
        if (p.key === HOOK_KEY_SET.MODIFY_WEBPACK) {
          p.action = ACTION.UPDATE;
        }
        this.register(p);
      });
  }

  freezeCliOptsWith(cliOpts: Partial<ICliOptions>) {
    this.cliOpts = Object.freeze(cliOpts);
  }

  run() {
    this.commander.parse();
  }
}

export default Service;
