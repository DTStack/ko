import Commander from './commander';
import Hooks from './hooks';
import Config from './config';
import { STATE, IOptions } from '../types';

class Service extends Hooks {
  public state: STATE;
  public config: IOptions;
  public commander: Commander;

  constructor() {
    super();
    this.state = STATE.INIT;
    this.commander = new Commander();
    this.config = new Config().generate();
    this.config.plugins && this.config.plugins.forEach((p) => this.register(p));
  }

  run() {
    this.state = STATE.PARSE;
    this.commander.parse();
  }
}

export default Service;
