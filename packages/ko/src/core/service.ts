import { Command } from 'commander';
import Plugins from './plugins';
import Config from './config';
import { IOptions, STATE } from './types';

type CommandOptions = {
  name: string;
  desc: string;
  options: [string, string][];
  fn: Function;
};

class Service {
  private state: STATE;
  private program: Command;
  private commands: Record<string, Function>;
  private plugins: Plugins;
  private opts: IOptions;
  private cwd: IOptions['cwd'];
  private env: IOptions['env'];
  private userConfig: Record<string, any>;

  constructor(opts: IOptions) {
    this.opts = opts;
    this.cwd = opts.cwd;
    this.env = opts.env;
    this.program = new Command();
    this.plugins = new Plugins(this);
  }

  registerCommand(opts: CommandOptions): void {
    this.commands[opts.name] = () => {
      const cmd = this.program.command(opts.name).description(opts.desc);
      opts.options.forEach(o => {
        cmd.option(o[0], o[1]);
      });
      cmd.action(params => {
        opts.fn.call(this, params);
      });
    };
  }

  run(name: string) {
    this.state = STATE.ENVIRONMENT;
    const config = new Config({
      cwd: this.cwd,
      path: this.
    })
  }
}

export default Service;
