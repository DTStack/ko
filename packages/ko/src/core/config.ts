import { join } from 'path';
import { existsSync } from 'fs';
import assert from 'assert';

type IOpts = {
  cwd: string;
  path: string;
};

class Config {
  private cwd: string;
  private configPath: string;
  constructor(opts: IOpts) {
    this.cwd = opts.cwd;
    this.configPath = this.getConfigPath(opts.path || 'ko.config.js');
  }

  private getConfigPath(path: string) {
    const absolutePath = join(this.cwd, path);
    assert(
      existsSync(absolutePath),
      'config file not exist, please check if it exist'
    );
    return absolutePath;
  }

  private memoize<T extends (...args: any) => any>(fn: T): any {
    let ret: undefined;
    let cached = false;
    return () => {
      if (cached) {
        return ret;
      }
      ret = fn();
      cached = true;
      //@ts-ignore
      fn = undefined;
      return ret;
    };
  }

  public getUserConfig() {
    const fn = () => {
      const config = require(this.configPath);
      return config;
    };
    return this.memoize(fn);
  }
}

export default Config;
