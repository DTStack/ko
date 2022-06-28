import { program, Command } from 'commander';
import { assert } from '../utils';

type RegisterOptions = {
  flags: string;
  description: string;
  defaultValue?: string | boolean;
};

type CMDProperties = {
  description: string;
  options?: RegisterOptions[];
  args?: {
    flags: string;
    description: string;
  }[];
  action?: ActionFn;
};

type ActionFn = Parameters<typeof program.action>[0];

enum STATE {
  INIT,
  PARSE,
  DONE,
}

class Commander {
  private STATE: STATE;
  public program: Command;
  private pkg: Record<string, string>;
  private cmdSet: Record<string, CMDProperties>;
  constructor() {
    this.program = program;
    this.STATE = STATE.INIT;
    this.cmdSet = {} as Record<string, CMDProperties>;
    this.pkg = require('../../package.json');
  }

  registerCommand({
    name,
    description,
    args,
    options,
  }: CMDProperties & { name: string }) {
    assert(
      this.STATE === STATE.INIT,
      `register command should be called in INIT state`
    );
    assert(!this.cmdSet[name], `command ${name} has been registered`);
    assert(description, `command ${name} must have a description`);
    this.cmdSet[name] = {
      description,
      options,
      args,
    };
  }

  bindAction(name: string, fn: ActionFn) {
    assert(
      this.STATE === STATE.INIT,
      `bind command action should be called in INIT state`
    );
    assert(this.cmdSet[name], `command ${name} hasn't been registered`);
    assert(
      !this.cmdSet[name].action,
      `command ${name} action has been registered`
    );
    this.cmdSet[name].action = fn;
  }

  parse() {
    this.STATE = STATE.PARSE;
    this.program
      .description('Project Toolkit for React Applications')
      .version(this.pkg!.version, '-v, --version')
      .usage('<command> [options]');
    Object.keys(this.cmdSet).forEach(name => {
      const cmd = this.cmdSet[name];
      const command = this.program.command(name);
      command.description(cmd.description);
      if (cmd.args) {
        cmd.args.forEach(argv => {
          command.argument(argv.flags, argv.description);
        });
      }
      if (cmd.options) {
        cmd.options.forEach(option => {
          command.option(option.flags, option.description, option.defaultValue);
        });
      }
      if (cmd.action) {
        command.action(cmd.action);
      } else {
        throw new Error(`command ${name} action hasn't been bind`);
      }
    });
    this.program.parse();
    this.STATE = STATE.DONE;
  }
}

export default Commander;
