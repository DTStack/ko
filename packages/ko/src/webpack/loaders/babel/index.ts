import { join } from 'path';
import { getCacheIdentifier, getResolvePath } from '../../../utils';
import { ILoaderOptions } from '../../../core/types';

class BabelLoader {
  private BABEL_LOADER: string;
  private opts: ILoaderOptions;
  constructor(opts: ILoaderOptions) {
    this.BABEL_LOADER = getResolvePath('babel-loader');
    this.opts = opts;
  }

  get config() {
    return {
      loader: this.BABEL_LOADER,
      options: {
        presets: [
          [
            getResolvePath('babel-preset-ko-app'),
            {
              useAbsoluteRuntime: true,
            },
          ],
        ],
        plugins: this.plugins,
        babelrc: false,
        configFile: false,
        cacheIdentifier: this.cacheIdentifier,
        cacheDirectory: true,
        cacheCompression: false,
        compact: this.opts.isProd,
      },
    };
  }

  get plugins() {
    const { speedUp } = this.opts.experiment || {};
    return [
      getResolvePath('babel-plugin-treasure'),
      speedUp ? join(__dirname, './babel-plugin-module-federation') : null,
    ].filter(Boolean);
  }

  get cacheIdentifier() {
    return getCacheIdentifier(this.opts.isProd ? 'production' : '', [
      'ko',
      'babel-preset-ko-app',
      'babel-plugin-treasure',
      'react-dev-utils',
    ]);
  }
}

export default BabelLoader;
