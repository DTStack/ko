import { join } from 'path';
import { getCacheIdentifier, getResolvePath } from '../../../utils';
import { ILoaderOptions } from '../../../core/types';

class BabelLoader {
  private BABEL_LOADER: string;
  private opts: ILoaderOptions;
  private speedUp: boolean;
  constructor(opts: ILoaderOptions) {
    this.BABEL_LOADER = getResolvePath('babel-loader');
    this.opts = opts;
    this.speedUp = this.opts?.experiment?.speedUp || true;
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
        cacheDirectory: !this.speedUp,
        cacheCompression: false,
        compact: this.opts.isProd,
      },
    };
  }

  get treasurePluginConfig() {
    const babelPluginTreasurePath = getResolvePath('babel-plugin-treasure');
    return [
      [
        babelPluginTreasurePath,
        {
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: 'css',
        },
        'antd',
      ],
      [
        babelPluginTreasurePath,
        {
          libraryName: 'dt-react-component',
          libraryDirectory: '/',
          camel2DashComponentName: 'lower',
        },
        'drc',
      ],
      //TODO: check lodash tree shaking in webpack 5
      // [
      //   babelPluginTreasurePath,
      //   {
      //     libraryName: 'lodash',
      //     libraryDirectory: '/',
      //     camel2DashComponentName: false,
      //   },
      //   'lodash',
      // ],
    ];
  }

  get plugins() {
    debugger;
    return [
      ...this.treasurePluginConfig,
      this.speedUp
        ? [
            getResolvePath('babel-plugin-module-federation'),
            // Babel Options Can Only Passed Plain Object
            {
              remoteName: 'ko',
              externals: this.opts.externals,
              alias: this.opts.alias,
            },
          ]
        : null,
    ].filter(Boolean);
  }

  get cacheIdentifier() {
    return getCacheIdentifier(this.opts.isProd ? 'production' : '', [
      'ko',
      'babel-preset-ko-app',
      'babel-plugin-treasure',
    ]);
  }
}

export default BabelLoader;
