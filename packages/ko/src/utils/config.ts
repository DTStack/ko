import { resolve, isAbsolute } from 'path';
import { existsSync } from 'fs';

class Config {
  private static instance: Config;
  cwd: string;
  default: {
    [key: string]: string;
  };
  isProductionEnv: boolean;

  private constructor() {
    this.cwd = process.cwd();
    this.default = {
      dist: this.getFileRealPath('dist'),
      host: '0.0.0.0',
      port: '8080',
    };
    this.isProductionEnv = process.env.NODE_ENV === 'production';
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

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public getFileRealPath(path: string): string {
    return isAbsolute(path) ? path : resolve(this.cwd, path);
  }

  private getUserConfig() {
    const fn = () => {
      const userConfPath = this.getFileRealPath('ko.config.js');
      if (existsSync(userConfPath)) {
        return require(userConfPath);
      } else {
        throw new Error('user config file not exist, please check if it exist');
      }
    };
    return this.memoize(fn);
  }

  public get userConf() {
    return this.getUserConfig();
  }
}

export default Config.getInstance();
