import chalk from 'chalk';

export abstract class ActionFactory {
  protected abstract generatorConfig(opts: any): any;
  protected abstract action(): void;

  protected successStdout(log: string) {
    console.log(chalk.green(log));
  }
}

export default ActionFactory;
