import { Configuration } from 'webpack';
import { merge } from 'lodash';
import loaders from './loaders';
import getPlugins from './plugins';
import Service from '../core/service';
import { IOptions } from '../types';

class WebpackConfig {
  private extensions = [
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.css',
    '.scss',
    '.sass',
    '.less',
    '.json',
    '.html',
  ];
  private opts: IOptions;
  private env: 'production' | 'development';
  constructor(service: Service) {
    this.opts = { ...service.config, ...service.cliOpts };
    this.env =
      process.env.NODE_ENV === 'production' ? 'production' : 'development';
  }

  public merge(...opts: Configuration[]): Configuration {
    return merge(this.base, ...opts);
  }

  get base() {
    const {
      cwd,
      publicPath,
      entry,
      outputPath,
      alias,
      hash,
      analyzer,
      experiment,
    } = this.opts;
    const cache: Configuration['cache'] = {
      type: experiment?.speedUp
        ? 'filesystem'
        : this.isProd
        ? 'filesystem'
        : 'memory',
    };
    if (!experiment?.speedUp && !this.isProd) {
      (cache as any).maxGenerations = 1;
    }
    const webpackBaseConf = {
      mode: this.env,
      target: 'web',
      context: cwd,
      entry,
      output: {
        path: outputPath,
        filename: `js/[name].${hash ? '[contenthash].' : ''}js`,
        publicPath,
      },
      module: {
        rules: loaders({
          isProd: this.isProd,
          ...this.opts,
        }),
      },
      plugins: getPlugins({
        isProd: this.isProd,
        analyzer,
        ...this.opts,
      }),
      resolve: {
        extensions: this.extensions,
        alias,
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
        hints: false,
      },
      cache,
      stats: {
        cachedModules: false,
      },
    };
    return webpackBaseConf as Configuration;
  }

  get isProd() {
    return this.env === 'production';
  }
}

export default WebpackConfig;
