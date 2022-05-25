import BabelLoader from './babel';
import { ILoaderOptions } from '../../core/types';
class Script {
  private THREAD_LOADER: string;
  private WORKER_LOADER: string;
  private opts: ILoaderOptions;
  private babelLoader: BabelLoader;
  constructor(opts: ILoaderOptions) {
    this.THREAD_LOADER = require.resolve('thread-loader');
    this.WORKER_LOADER = require.resolve('worker-loader');
    this.opts = opts;
    this.babelLoader = new BabelLoader(opts);
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
              workerNodeArgs: ['--max-old-space-size=4096'],
              name: 'ko-js-pool',
            },
          },
          this.babelLoader.config,
        ],
      },
    ];
    return scriptLoader;
  }
}

export default Script;
