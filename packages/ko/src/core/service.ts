import Commander from './commander';
import Hooks from './hooks';
import Config from './config';
import { STATE, HookOptions, IOptions } from './types';

class Service {
  public state: STATE;
  public config: IOptions;
  public hooks: Hooks;
  public commander: Commander;

  constructor() {
    this.state = STATE.INIT;
    this.commander = new Commander();
    this.hooks = new Hooks();
  }

  run(name: string) {
    this.state = STATE.INIT;
    this.commander.parse();
    this.state = STATE.LOAD;
    this.config = new Config().generate();
  }

  registerPlugin(opts: HookOptions) {
    this.hooks.register(opts);
  }

  apply() {
    //TODO: inject environment
  }
}

export default Service;
