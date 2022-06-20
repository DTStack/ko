import Commander from './commander';
import Hooks from './hooks';
import Config from './config';
import { IOptions, ICliOptions } from '../types';

class Service extends Hooks {
  public config: IOptions;
  public cliOpts: Partial<ICliOptions>;
  public commander: Commander;

  constructor() {
    super();
    this.commander = new Commander();
    this.config = new Config().generate();
    this.config.plugins && this.config.plugins.forEach(p => this.register(p));
  }

  freezeCliOptsWith(cliOpts: Partial<ICliOptions>) {
    this.cliOpts = Object.freeze(cliOpts);
  }

  run() {
    this.commander.parse();
  }
}

export default Service;
