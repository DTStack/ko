import getCacheIdentifier from '../../utils/getCacheIdentifier';
import { RuleSetRule } from 'webpack';

const THREAD_LOADER = require.resolve('thread-loader');
const BABEL_LOADER = require.resolve('babel-loader');
const WORKER_LOADER = require.resolve('worker-loader');
const SWC_LOADER = require.resolve('../../loaders/swc-loader');

class Script {
  rules: RuleSetRule[];
  isProduction: boolean;
  constructor(isProduction: boolean) {
    this.rules = [];
    this.isProduction = isProduction;
  }
  init() {
    this.isProduction ? this.production() : this.development();
  }
  development() {
    this.rules = [
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
        use: {
          loader: SWC_LOADER,
        },
      },
    ];
  }
  production() {
    this.rules = [
      {
        test: /\.worker.[jt]s$/,
        loader: WORKER_LOADER,
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
            loader: THREAD_LOADER,
            options: {
              workerNodeArgs: ['--max-old-space-size=4096'],
              name: 'ko-js-pool',
            },
          },
          {
            loader: BABEL_LOADER,
            options: {
              presets: [
                [
                  require.resolve('babel-preset-ko-app'),
                  {
                    useAbsoluteRuntime: true,
                  },
                ],
              ],
              babelrc: false,
              configFile: false,
              cacheIdentifier: getCacheIdentifier('production', [
                'babel-preset-ko-app',
                'react-dev-utils',
                'ko',
              ]),
              cacheDirectory: true,
              cacheCompression: false,
              compact: this.isProduction,
            },
          },
        ],
      },
    ];
  }
  get loaders() {
    return this.rules;
  }
}

export default Script;
