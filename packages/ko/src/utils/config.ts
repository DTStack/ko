import { resolve, isAbsolute } from 'path';
import { existsSync } from 'fs';

class Config {
  cwd: string;

  private static instance: Config;

  private constructor() {
    this.cwd = process.cwd();
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

  //TODO: define userConf
  public get userConf() {
    const userConfPath = this.getFileRealPath('ko.config.js');
    if (existsSync(userConfPath)) {
      return userConfPath ? require(userConfPath as string) : {};
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
