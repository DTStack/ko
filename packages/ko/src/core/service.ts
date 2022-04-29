import { Command } from 'commander';
import Traits from './traits';
import Config from './config';
import { IOptions, STATE } from './types';

class Service {
  private state: STATE;
  private program: Command;
  private commands: Record<string, Function>;
  private traits: Traits;
  private opts: IOptions;
  private cwd: IOptions['cwd'];
  private env: IOptions['env'];
  private configs: Record<string, any>;

  constructor(opts: IOptions) {
    this.opts = opts;
    this.cwd = opts.cwd;
    this.env = opts.env;
    this.program = new Command();
    this.traits = new Traits();
  }

  run(name: string) {
    this.state = STATE.INIT;
    this.configs = new Config({
      cwd: this.cwd,
    }).get();
    this.state = STATE.LOAD;
    const plugins = this.configs.plugins;
    this.initPlugins(plugins);
  }

  initPlugins(plugins: any[]) {
    plugins.forEach(p => {
      const api = Service.createApi({
        service: this,
        serviceScope: ['state', 'opts', 'cwd', 'configs'],
        traits: this.traits,
      });
    });
  }

  static createApi(opts: {
    service: Service;
    serviceScope: string[];
    traits: Traits;
  }) {
    return new Proxy(opts.traits, {
      get(traits, key: string) {
        if (opts.serviceScope.includes(key)) {
          //@ts-ignore
          const scope = opts.service[key];
          return scope;
        }
        //@ts-ignore
        return traits[key];
      },
    });
  }
}

export default Service;
