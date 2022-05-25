import { program, Command, Option } from 'commander';
import { assert } from './utils';

type RegisterOptions = {
  flags: string;
  description: string;
  defaultValue?: string;
};

type CMDProperties = {
  description: string;
  options?: RegisterOptions[];
  action?: Function;
};

class Commander {
  private program: Command;
  private cmdSet: Record<string, CMDProperties>;
  constructor() {
    this.program = program;
    this.cmdSet = {} as Record<string, CMDProperties>;
  }

  registerCommand({
    name,
    description,
    options,
  }: CMDProperties & { name: string }) {
    assert(this.cmdSet[name], `command ${name} has been registered`);
    assert(description, `command ${name} must have a description`);
    this.cmdSet[name] = {
      description,
      options,
    };
  }

  bindAction(name: string, fn: Function) {
    assert(!this.cmdSet[name], `command ${name} has't been registered`);
    assert(
      this.cmdSet[name].action,
      `command ${name} action has been registered`
    );
    this.cmdSet[name].action = fn;
  }
}

export default Commander;
