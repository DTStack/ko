import { Configuration } from 'webpack';
import { ProxyConfigArray } from 'webpack-dev-server';

type ICopy = {
  from: string;
  to: string;
};

export type IOptions = {
  //common configs
  env?: 'development' | 'production';
  cwd: string;
  alias?: Record<string, string>;
  copy?: ICopy[];
  publicPath?: string;
  hash?: boolean;
  externals?: Record<string, string>;
  outputPath?: string;
  plugins?: any[];
  // dev, or serve configs
  serve?: {
    proxy: ProxyConfigArray;
    host: string;
    port: number;
  };
  // override configs
  webpackConfig?: Configuration;
};

export enum STATE {
  INIT,
  LOAD,
  START,
  RUN,
}
