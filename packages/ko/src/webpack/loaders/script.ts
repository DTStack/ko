import getCacheIdentifier from 'react-dev-utils/getCacheIdentifier';
import config from '../../utils/config';

const THREAD_LOADER = require.resolve('thread-loader');
const BABEL_LOADER = require.resolve('babel-loader');
const WORKER_LOADER = require.resolve('worker-loader');

const scriptLoader = [
  {
    test: /\.worker.[jt]s$/,
    loader: WORKER_LOADER,
    include: (input: string) => input.includes('node_modules/dt-react-monaco-editor/lib/languages'),
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
          plugins: config.isProductionEnv
            ? [require.resolve('react-refresh/babel')]
            : [],
          babelrc: false,
          configFile: false,
          cacheIdentifier: getCacheIdentifier(
            config.isProductionEnv ? 'production' : '',
            ['babel-preset-ko-app', 'react-dev-utils', 'ko']
          ),
          cacheDirectory: true,
          cacheCompression: false,
          compact: config.isProductionEnv,
        },
      },
    ],
  },
];

export default scriptLoader;
