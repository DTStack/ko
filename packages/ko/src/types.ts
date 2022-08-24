import { Pattern } from 'copy-webpack-plugin';
import { Plugin } from 'postcss';
import { IKeys, IOpts } from 'ko-lints';
import { IOpts as AutoPolyfillsWebpackPluginOptions } from 'auto-polyfills-webpack-plugin';

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
  dynamicResolve?: <T extends any>(request: T) => T;
  autoPolyfills: boolean | AutoPolyfillsWebpackPluginOptions;
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
    disableLazyImports?: boolean;
    enableCssModule?: boolean;
  };
  lints?: Record<IKeys, Omit<IOpts, 'write'>>;
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
