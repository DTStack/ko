import { Configuration } from 'webpack';
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
  const { hash } = opts;
  const webpackBaseConf = {
    mode: config.isProductionEnv ? <const>'production' : <const>'development',
    target: 'web',
    context: config.cwd,
    entry: 'src/index',
    output: {
      path: config.default.dist,
      filename: hash ? '[name].[contenthash].js' : '[name].js',
      publicPath: '/',
    },
    module: {
      rules: loaders,
    },
    plugins: getPlugins(),
    resolve: {
      extensions,
      fallback: {
        fs: false,
        path: false,
        events: false,
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer/'),
        string_decoder: require.resolve('string_decoder/'),
      },
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
