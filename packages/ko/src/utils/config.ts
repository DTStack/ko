import { resolve, isAbsolute } from 'path';
import { existsSync } from 'fs';

class Config {
  cwd: string;

  private static instance: Config;

  public babelPlugins: [
    string,
    {
      [key: string]: any;
    }
  ][] = [];

  private constructor() {
    this.cwd = process.cwd();
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = Object.freeze(new Config());
    }
    return Config.instance;
  }

  public getFileRealPath(path: string): string {
    return isAbsolute(path) ? path : resolve(this.cwd, path);
  }

  public get userConf() {
    const userConfPath = this.getFileRealPath('ko.config.js');
    if (existsSync(userConfPath)) {
      const userConf = require(userConfPath);
      this.babelPlugins = userConf.babelPlugins || [];
      delete userConf.babelPlugins;
      return userConf;
    } else {
      throw new Error('user config file not exist, please check it!');
    }
  }

  public get defaultPaths() {
    return {
      src: this.getFileRealPath('src'),
      dist: this.getFileRealPath('dist'),
      public: this.getFileRealPath('public'),
      html: this.getFileRealPath('public/index.html'),
      tsconfig: this.getFileRealPath('tsconfig.json'),
    };
  }

  public get isProductionEnv(): boolean {
    const PROD = 'production';
    return process.env.NODE_ENV === PROD;
  }
}

export default Config.getInstance();
