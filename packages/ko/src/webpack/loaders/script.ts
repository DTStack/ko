import BabelLoader from './babel';
import { IWebpackOptions } from '../../core/types';
import ModuleGraph from '../plugins/moduleGraph';
class Script {
  private THREAD_LOADER: string;
  private WORKER_LOADER: string;
  private babelLoader: BabelLoader;
  constructor(opts: IWebpackOptions, moduleGraph?: ModuleGraph) {
    this.THREAD_LOADER = require.resolve('thread-loader');
    this.WORKER_LOADER = require.resolve('worker-loader');
    this.babelLoader = new BabelLoader(opts, moduleGraph);
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
