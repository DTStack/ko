import chalk from 'chalk';
import Service from '../core/service';

export abstract class ActionFactory {
  protected service: Service;
  protected abstract generateConfig(opts: any): any;
  protected abstract registerCommand(): void;
  protected abstract action(...args: any[]): void;

  protected constructor(service: Service) {
    this.service = service;
  }

  protected successStdout(...logs: string[]) {
    console.log(...logs.map(log => chalk.green(log)));
  }

  protected warningStdout(...logs: string[]) {
    console.log(...logs.map(log => chalk.green(log)));
  }

  protected errorStdout(...logs: string[]) {
    console.log(...logs.map(log => chalk.green(log)));
  }
}

export default ActionFactory;
