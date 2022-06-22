import { Configuration } from 'webpack';
import { Pattern } from 'copy-webpack-plugin';
import { Plugin } from 'postcss';

export type IOptions = {
  //common configs
  cwd: string;
  alias?: Record<string, string>;
  copy?: Pattern[];
  entry?: string;
  outputPath?: string;
  publicPath?: string;
  hash?: boolean;
  externals?: Record<string, string>;
  plugins?: any[];
  htmlTemplate?: string;
  // style configs
  analyzer?: boolean;
  extraPostCSSPlugins?: Plugin[];
  lessOptions?: any;
  antdV4LessOptions?: any;
  // dev, or serve configs
  serve: {
    proxy?: Record<string, any>;
    host: string;
    port: number;
    staticPath?: string;
  };
  // experimental features
  experiment?: {
    speedUp?: boolean;
    minimizer?: boolean;
    enableCssModule?: boolean;
  };
};

export type ICliOptions = {
  hash?: boolean;
  analyzer?: boolean;
};

export type IWebpackOptions = IOptions & {
  isProd: boolean;
} & ICliOptions;

export type HookItem = {
  name: string;
  fn: Function;
  stage?: number;
  before?: string;
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
