import { Configuration } from 'webpack';
import { ProxyConfigArray } from 'webpack-dev-server';

type ICopy = {
  from: string;
  to: string;
};

export type IOptions = {
  //common configs
  env?: 'development' | 'production' | 'none';
  cwd: string;
  alias?: Record<string, string>;
  copy?: ICopy[];
  entry?: string;
  outputPath?: string;
  publicPath?: string;
  hash?: boolean;
  externals?: Record<string, string>;
  plugins?: any[];
  // style configs
  extraPostCSSPlugins?: any[];
  lessOptions?: any;
  // dev, or serve configs
  serve: {
    proxy?: ProxyConfigArray;
    host: string;
    port: number;
  };
  // override configs
  webpackConfig?: Configuration;
  // experimental features
  experiment?: {
    speedUp?: boolean;
    minimizer?: boolean;
  };
};

export type ILoaderOptions = IOptions & {
  isProd: boolean;
};

export enum STATE {
  INIT,
  LOAD,
  START,
  STOP,
}

export type HookItem = {
  name: string;
  fn: Function;
  stage?: number;
  before?: string | string[];
};

export enum ACTION {
  ADD = 'add',
  UPDATE = 'update',
}

export type HookOptions = {
  key: string;
  action: ACTION;
  opts: HookItem;
};
