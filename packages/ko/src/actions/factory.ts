import chalk from 'chalk';
import Service from '../core/service';

export abstract class ActionFactory {
  protected service: Service;
  protected abstract generateConfig(opts: any): any;
  protected abstract registerCommand(program: any): void;
  protected abstract bind(): void;

  protected constructor(service: Service) {
    this.service = service;
  }

  protected successStdout(log: string) {
    console.log(chalk.green(log));
  }
}

export default ActionFactory;
