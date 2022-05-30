import chalk from 'chalk';
import Service from '../core/service';

export abstract class ActionFactory {
  protected service: Service;
  protected abstract generateConfig(): any;
  protected abstract registerCommand(): void;
  protected abstract action(): void;

  protected constructor(service: Service) {
    this.service = service;
  }

  protected successStdout(log: string) {
    console.log(chalk.green(log));
  }

  protected errorStdout(log: string) {
    console.log(chalk.red(log));
  }
}

export default ActionFactory;
