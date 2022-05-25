import Commander from './commander';
import Hooks from './hooks';
import Config from './config';
import { IOptions, STATE, HookOptions } from './types';

class Service extends Commander {
  private state: STATE;
  private opts: IOptions;
  private cwd: IOptions['cwd'];
  private env: IOptions['env'];
  private configs: Record<string, any>;
  private hooks: Hooks;

  constructor() {
    super();
    this.hooks = new Hooks();
  }

  registerPlugin(opts: HookOptions) {
    this.hooks.register(opts);
  }

  apply() {
    //TODO: inject environment
  }

  run(name: string) {
    this.state = STATE.INIT;
    this.configs = new Config({
      cwd: this.cwd,
    }).get();
    this.state = STATE.LOAD;
  }
}

export default Service;
