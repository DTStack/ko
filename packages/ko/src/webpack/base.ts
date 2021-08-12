import { mergeWithCustomize, unique } from 'webpack-merge';
import config from 'utils/config';
import { Options } from 'interfaces';
import getLoaders from './loaders';
import getPlugins from './plugins';

function pluginsUnique(pluginsName: Array<string>) {
  return unique(
    'plugins',
    pluginsName,
    (plugin) => plugin.constructor && plugin.constructor.name
  );
}

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

function getWebpackBaseConf(opts: Options) {
  const { ts, hash } = opts;
  const webpackBaseConf = {
    mode: config.isProductionEnv ? 'production' : 'development',
    target: 'web',
    context: config.cwd,
    entry: config.getFileRealPath(`src/index.${ts ? 'tsx' : 'js'}`),
    output: {
      path: config.defaultPaths.dist,
      filename: hash ? 'js/[name].[contenthash].js' : 'js/[name].js',
      publicPath: '/',
    },
    module: {
      rules: getLoaders(opts),
    },
    plugins: getPlugins(opts),
    resolve: {
      extensions,
    },
    performance: {
      hints: false,
    },
  };
}

export default getWebpackBaseConf;

