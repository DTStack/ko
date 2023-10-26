import { Pattern } from 'copy-webpack-plugin';
import { Plugin } from 'postcss';
import { IKeys, IOpts } from 'ko-lints';
import { IOpts as AutoPolyfillsWebpackPluginOptions } from '@dtinsight/auto-polyfills-webpack-plugin';

export type IOptions = {
  //common configs
  /**
   * The current working directory.
   * @param {string}
   */
  cwd: string;
  /**
   * An object mapping module names to file paths or directories.
   * @param {Record<string, string>}
   */
  alias?: Record<string, string>;
  /**
   * An array of patterns specifying files to copy to the output directory.
   * @param {Pattern[]}
   */
  copy?: Pattern[];
  /**
   * The entry point of the application.
   * @param {string}
   */
  entry?: string;
  /**
   * The path to the output directory.
   * @param {string}
   */
  outputPath?: string;
  /**
   * The public path of the application.
   * @param {string}
   */
  publicPath?: string;
  /**
   * Whether to append a hash to the output file name for cache busting.
   * @param {boolean}
   */
  hash?: boolean;
  /**
   * An object mapping module names to global variables.
   * @param {Record<string, string>}
   */
  externals?: Record<string, string>;
  /**
   * An array of plugin configurations.
   * @param {HookOptions[]}
   */
  plugins?: HookOptions[];
  /**
   * The path to the HTML template to use for the application.
   * @param {string}
   */
  htmlTemplate?: string;
  htmlChunks?: 'all' | string[];
  // style configs
  /**
   * Whether to enable the bundle analyzer plugin.
   * @param {boolean}
   */
  analyzer?: boolean;
  /**
   * An array of additional PostCSS plugins to use.
   * @param {Plugin[]}
   */
  extraPostCSSPlugins?: Plugin[];
  /**
   * Options to pass to the Less compiler.
   * @param {*}
   */
  lessOptions?: any;
  // integrated plugins options
  /**
   * A function to dynamically resolve module requests.
   * @param {Function}
   */
  dynamicResolve?: <T extends any>(request: T) => T;
  /**
   * Whether to enable the auto-polyfills plugin, or an options object for the plugin.
   * @param {string}
   */
  autoPolyfills: boolean | AutoPolyfillsWebpackPluginOptions;
  // dev, or serve configs
  /**
   * Options for the development server.
   * @param {{proxy?: Record<string, any>, host: string, port: number, staticPath?: string, historyApiFallback?: any, compilationSuccessInfo?: { messages: string[]; notes?: string[] }}}
   */
  serve: {
    proxy?: Record<string, any>;
    host: string;
    port: number;
    staticPath?: string;
    historyApiFallback?: any;
    compilationSuccessInfo?: { messages: string[]; notes?: string[] };
  };
  // experimental features
  /**
   * Experimental features to enable.
   * @param {{speedUp?: boolean, minimizer?: boolean, disableLazyImports?: boolean, enableCssModule?: boolean, compress?: any}}
   */
  experiment?: {
    speedUp?: boolean;
    minimizer?: boolean;
    disableLazyImports?: boolean;
    enableCssModule?: boolean;
    compress?: any;
  };
  //misc
  /**
   * Options for the linter plugins.
   * @param {Record<IKeys, Omit<IOpts, 'write'>>}
   */
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

export enum HOOK_KEY_SET {
  WEBPACK_PLUGIN = 'WebpackPlugin',
  MODIFY_WEBPACK = 'ModifyWebpack',
}

export type HookOptions = {
  key: string;
  action: ACTION;
  opts: HookItem;
};
