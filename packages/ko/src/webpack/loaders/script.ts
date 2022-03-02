import getCacheIdentifier from 'react-dev-utils/getCacheIdentifier';
import config from '../../utils/config';

const THREAD_LOADER = require.resolve('thread-loader');
const BABEL_LOADER = require.resolve('babel-loader');

const scriptLoader = [
  {
    test: /\.(t|j)sx?$/,
    exclude: {
      and: [/node_modules/],
      not: [/dt-common/],
    },
    use: [
      THREAD_LOADER,
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
