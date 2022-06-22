import { join } from 'path';
import { existsSync } from 'fs';
import { merge, cloneDeep } from 'lodash';
import { assert } from './utils';
import { IOptions, ICliOptions } from '../types';

class Config {
  private cwd: string;
  private origin: Record<string, any>;
  private current: Record<string, any>;
  private path: string;
  public cliOpts: Partial<ICliOptions>;
  constructor() {
    this.cwd = process.cwd();
    this.path = this.getConfigPath('ko.config.js');
    this.generate();
  }

  private get isHelpCommand() {
    const flag = process.argv.find(arg => arg === '--help' || arg === '-h');
    return !!flag;
  }

  private getConfigPath(path: string) {
    const absolutePath = join(process.cwd(), path);
    !this.isHelpCommand &&
      assert(
        existsSync(absolutePath),
        'ko.config.js file not exist, please check if it exist'
      );
    return absolutePath;
  }

  public generate() {
    this.origin = {};
    if (!this.isHelpCommand) {
      this.origin = require(this.path);
    }
    this.current = merge(this.default, cloneDeep(this.origin));
    return Object.freeze(this.current) as IOptions;
  }

  public freezeWithOpts(cliOpts: Partial<ICliOptions>) {
    this.cliOpts = cliOpts;
    return Object.freeze(merge(this.current, this.cliOpts));
  }

  get default(): Partial<IOptions> {
    return {
      cwd: this.cwd,
      serve: {
        host: '127.0.0.1',
        port: 8080,
      },
      hash: true,
      analyzer: false,
      lessOptions: {
        javascriptEnabled: true,
      },
      publicPath: '/',
      experiment: {
        speedUp: true,
        minimizer: true,
        enableCssModule: true,
      },
    };
  }
}

export default Config;
