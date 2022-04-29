import { Configuration } from 'webpack';
import { ProxyConfigArray } from 'webpack-dev-server';

type ICopy = {
  from: string;
  to: string;
};

export type IOptions = {
  //common configs
  env?: 'development' | 'production';
  cwd?: string;
  alias?: Record<string, string>;
  copy?: ICopy[];
  publicPath?: string;
  hash?: boolean;
  externals?: Record<string, string>;
  outputPath?: string;
  // dev, or serve configs
  serve?: {
    proxy: ProxyConfigArray;
    host: string;
    port: number;
  };
  // override configs
  webpack?: Configuration;
};

export enum STATE {
  ENVIRONMENT,
  INIT,
  BEFORE_START,
  START,
  RUN,
}
