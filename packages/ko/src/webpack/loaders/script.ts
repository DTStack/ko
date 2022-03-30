import getCacheIdentifier from 'react-dev-utils/getCacheIdentifier';
import config from '../../utils/config';

const THREAD_LOADER = require.resolve('thread-loader');
const BABEL_LOADER = require.resolve('babel-loader');

const scriptLoader = [
  {
    test: /\.worker.[jt]s$/,
    loader: 'worker-loader',
    options: {
      inline: 'fallback',
    },
  },
  {
    test: /\.(t|j)sx?$/,
    exclude: {
      and: [/node_modules/],
      not: [/dt-common/],
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
