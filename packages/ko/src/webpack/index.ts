import { join } from 'path';
import { existsSync } from 'fs';
import { Configuration, FileCacheOptions } from 'webpack';
import DynamicResolveWebpackPlugin from 'dynamic-resolve-webpack-plugin';
import { merge } from 'lodash';
import loaders from './loaders';
import getPlugins from './plugins';
import { assert } from '../utils';
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

  get cache() {
    const { experiment } = this.opts;
    const type = experiment?.speedUp
      ? 'filesystem'
      : this.isProd
      ? 'filesystem'
      : 'memory';
    const cache: Exclude<NonNullable<Configuration['cache']>, boolean> = {
      type,
    };
    if (type === 'filesystem') {
      (cache as FileCacheOptions).version = this.projectVersion;
      (cache as FileCacheOptions).maxAge = 7 * 24 * 3600000;
    } else {
      (
        cache as Exclude<
          NonNullable<Configuration['cache']>,
          boolean | FileCacheOptions
        >
      ).maxGenerations = 1;
    }
    return cache;
  }

  get projectVersion(): string {
    const pkgPath = join(this.opts.cwd, 'package.json');
    assert(existsSync(pkgPath), 'project package.json file not found');
    return require(pkgPath).version;
  }

  get base() {
    const { cwd, publicPath, entry, outputPath, alias, hash, analyzer } =
      this.opts;

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
        plugins: [
          this.opts.dynamicResolve &&
            new DynamicResolveWebpackPlugin({
              dynamic: this.opts.dynamicResolve,
            }),
        ].filter(Boolean),
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
      cache: this.cache,
      stats: 'none',
      infrastructureLogging: {
        level: 'error',
      },
    };
    return webpackBaseConf as Configuration;
  }

  get isProd() {
    return this.env === 'production';
  }
}

export default WebpackConfig;
