import { join } from 'path';
import { realpathSync, existsSync } from 'fs';
import { loader as MiniCssExtractPluginLoader } from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
const postCssUrl = require('postcss-url');
import { getResolvePath } from '../../utils';
import { IWebpackOptions } from '../../types';

class Style {
  private STYLE_LOADER = getResolvePath('style-loader');
  private CSS_LOADER = getResolvePath('css-loader');
  private SASS_LOADER = getResolvePath('sass-loader');
  private LESS_LOADER = getResolvePath('less-loader');
  private POSTCSS_LOADER = getResolvePath('postcss-loader');
  private CSS_MODULE_FILE_SUFFIX_REGEX = /\.module.s[ac]ss$/;
  private opts: IWebpackOptions;
  constructor(opts: IWebpackOptions) {
    this.opts = opts;
  }

  get config() {
    const enableCssModule = this.opts?.experiment?.enableCssModule;
    return [
      {
        test: /\.css$/,
        use: [this.styleLoader, this.cssLoader, this.postCSSLoader],
      },
      {
        test: /\.s[ac]ss$/,
        exclude: (input: string) => {
          if (enableCssModule) {
            return this.CSS_MODULE_FILE_SUFFIX_REGEX.test(input);
          } else {
            return false;
          }
        },
        use: [
          this.styleLoader,
          this.cssLoader,
          this.postCSSLoader,
          this.sassLoader,
        ],
      },
      enableCssModule && this.sassCssModuleConfig,
      {
        test: /\.less$/,
        exclude: [this.realAntdV4Path],
        use: [
          this.styleLoader,
          this.cssLoader,
          this.postCSSLoader,
          this.lessLoader,
        ],
      },
      {
        test: /\.less$/,
        include: [this.realAntdV4Path],
        use: [
          this.styleLoader,
          this.cssLoader,
          this.postCSSLoader,
          this.antdV4LessLoader,
        ],
      },
    ];
  }

  get sassCssModuleConfig() {
    return {
      test: /\.module.s[ac]ss$/,
      use: [
        this.styleLoader,
        {
          loader: this.CSS_LOADER,
          options: {
            esModule: true,
            modules: {
              namedExport: true,
              localIdentName: this.opts.isProd
                ? '[path][name]__[local]'
                : '[local]_[hash:base64]',
            },
          },
        },
        this.postCSSLoader,
        this.sassLoader,
      ],
    };
  }

  //TODO: remove when upgrade to antd v4
  get realAntdV4Path() {
    const antdV4Path = join(this.opts.cwd, 'node_modules/antd-v4');
    const ret = existsSync(antdV4Path) ? realpathSync(antdV4Path) : antdV4Path;
    return ret;
  }

  get styleLoader() {
    return {
      loader: this.opts.isProd ? MiniCssExtractPluginLoader : this.STYLE_LOADER,
    };
  }

  get cssLoader() {
    return {
      loader: this.CSS_LOADER,
      options: {
        sourceMap: true,
      },
    };
  }

  get sassLoader() {
    return {
      loader: this.SASS_LOADER,
      options: {
        sourceMap: true,
      },
    };
  }

  get lessLoader() {
    const { lessOptions = {} } = this.opts;
    return {
      loader: this.LESS_LOADER,
      options: {
        sourceMap: true,
        lessOptions,
      },
    };
  }

  get antdV4LessLoader() {
    const { antdV4LessOptions = {} } = this.opts;
    return {
      loader: this.LESS_LOADER,
      options: {
        sourceMap: true,
        lessOptions: antdV4LessOptions,
      },
    };
  }

  get postCSSLoader() {
    return {
      loader: this.POSTCSS_LOADER,
      options: {
        sourceMap: true,
        postcssOptions: {
          plugins: this.postCSSPlugins,
        },
      },
    };
  }

  get postCSSPlugins() {
    const extraPostCSSPlugins = this.opts.extraPostCSSPlugins || [];
    return [
      autoprefixer(),
      postCssUrl([
        {
          filter: '**/src/public/img/**/*',
          url: (args: any) => {
            const originUrl = args?.originUrl;
            return originUrl
              ? join(this.opts.cwd, originUrl)
              : args.absolutePath;
          },
          basePath: '/',
        },
        {
          filter: '**/src/public/font/**/*',
          url: (args: any) => {
            const originUrl = args?.originUrl;
            return originUrl
              ? join(this.opts.cwd, originUrl)
              : args.absolutePath;
          },
          basePath: '/',
        },
      ]),
      ...extraPostCSSPlugins,
    ].filter(Boolean);
  }
}

export default Style;
