import { join } from 'path';
import { existsSync } from 'fs';
import { merge, cloneDeep } from 'lodash';
import { assert } from './utils';
import { IOptions } from '../types';

class Config {
  private cwd: string;
  private origin: Record<string, any>;
  private current: Record<string, any>;
  private path: string;
  constructor() {
    this.cwd = process.cwd();
    this.path = this.getConfigPath('ko.config.js');
  }

  private getConfigPath(path: string) {
    const absolutePath = join(process.cwd(), path);
    assert(
      existsSync(absolutePath),
      'config file not exist, please check if it exist'
    );
    return absolutePath;
  }

  public generate(): IOptions {
    this.origin = require(this.path);
    this.current = merge(this.default, cloneDeep(this.origin));
    return Object.freeze(this.current) as IOptions;
  }

  get default(): Partial<IOptions> {
    return {
      cwd: this.cwd,
      serve: {
        host: '127.0.0.1',
        port: 8080,
      },
      lessOptions: {
        javascriptEnabled: true,
      },
      publicPath: '/',
      experiment: {
        speedUp: true,
        minimizer: true,
      },
    };
  }
}

export default Config;
