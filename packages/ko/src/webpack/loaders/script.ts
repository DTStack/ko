import BabelLoader from './babel';
import { IWebpackOptions } from '../../types';
class Script {
  private THREAD_LOADER = require.resolve('thread-loader');
  private WORKER_LOADER = require.resolve('worker-loader');
  private ESBUILD_LOADER = require.resolve('esbuild-loader');
  private BABEL_LOADER: BabelLoader;
  private opts: IWebpackOptions;
  constructor(opts: IWebpackOptions) {
    this.opts = opts;
    this.BABEL_LOADER = new BabelLoader(opts);
  }

  get config() {
    const scriptLoader = [
      {
        test: /\.worker.[jt]s$/,
        loader: this.WORKER_LOADER,
        options: {
          inline: 'fallback',
        },
      },
      {
        test: /\.(t|j)sx?$/,
        include: (input: string) => {
          // internal modules dt-common compatible
          if (input.includes('node_modules/dt-common/src/')) {
            return true;
          } else if (input.includes('node_modules')) {
            return false;
          } else {
            return true;
          }
        },
        use: [
          {
            loader: this.THREAD_LOADER,
            options: {
              name: 'ko-js-pool',
            },
          },
          this.opts.isProd && this.BABEL_LOADER.config,
          !this.opts.isProd && {
            loader: this.ESBUILD_LOADER,
            options: {
              loader: 'tsx',
              target: 'es2020',
            },
          },
        ].filter(Boolean),
      },
    ];
    return scriptLoader;
  }
}

export default Script;
