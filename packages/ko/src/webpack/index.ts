import { Configuration } from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import config from '../utils/config';
import { Options } from '../interfaces';
import loaders from './loaders';
import getPlugins from './plugins';

const extensions = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.css',
  '.scss',
  '.sass',
  '.less',
  '.json',
  '.html',
];

function getWebpackBaseConf(opts: Options): Configuration {
  const { ts = true, hash } = opts;
  const webpackBaseConf = {
    mode: config.isProductionEnv ? <const>'production' : <const>'development',
    target: 'web',
    context: config.cwd,
    entry: `src/index.${ts ? 'tsx' : 'js'}`,
    output: {
      path: config.defaultPaths.dist,
      filename: hash ? 'js/[name].[contenthash].js' : 'js/[name].js',
      publicPath: '/',
    },
    module: {
      rules: loaders,
    },
    plugins: getPlugins(),
    resolve: {
      extensions,
      plugins: [
        ts &&
          new TsconfigPathsPlugin({
            configFile: config.defaultPaths.tsconfig,
          }),
      ].filter(Boolean) as any,
    },
    performance: {
      hints: <const>false,
    },
    cache: {
      type: config.isProductionEnv ? <const>'filesystem' : <const>'memory',
    },
    stats: {
      cachedModules: false,
    },
  };
  return webpackBaseConf as Configuration;
}

export default getWebpackBaseConf;
