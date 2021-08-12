import getCacheIdentifier from 'react-dev-utils/getCacheIdentifier';
import config from 'utils/config';
import { Options } from 'interfaces';

const THREAD_LOADER = require.resolve('thread-loader');
const BABEL_LOADER = require.resolve('babel-loader');

function getScriptLoaders(supportTypescript: boolean) {
  let scriptLoader: any = [
    {
      test: /\.jsx?$/,
      include: config.defaultPaths.src,
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
  if (supportTypescript) {
    const TS_LOADER = require.resolve('ts-loader');
    const typescriptLoader = {
      test: /\.tsx?$/,
      include: config.defaultPaths.src,
      use: [
        THREAD_LOADER,
        {
          loader: TS_LOADER,
          options: {
            transpileOnly: true,
            happyPackMode: true,
          },
        },
      ],
    };
    scriptLoader.push(typescriptLoader)
  }
  return scriptLoader;
}

export default getScriptLoaders;
