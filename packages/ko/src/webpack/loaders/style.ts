import { join } from 'path';
import { realpathSync } from 'fs';
import { loader as MiniCssExtractPluginLoader } from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import { getResolvePath } from '../../utils';
import { ILoaderOptions } from '../../core/types';

class Style {
  private STYLE_LOADER = getResolvePath('style-loader');
  private CSS_LOADER = getResolvePath('css-loader');
  private SASS_LOADER = getResolvePath('sass-loader');
  private LESS_LOADER = getResolvePath('less-loader');
  private POSTCSS_LOADER = getResolvePath('postcss-loader');
  private opts: ILoaderOptions;
  constructor(opts: ILoaderOptions) {
    this.opts = opts;
  }

  get config() {
    return [
      {
        test: /\.css$/,
        use: [this.styleLoader, this.cssLoader, this.postCSSLoader],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          this.styleLoader,
          this.cssLoader,
          this.postCSSLoader,
          this.sassLoader,
        ],
      },
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
          this.lessLoader,
        ],
      },
    ];
  }

  //TODO: remove when upgrade to antd v4
  get realAntdV4Path() {
    const antdV4Path = join(this.opts.cwd, 'node_modules/antd-v4');
    return antdV4Path;
  }

  get styleLoader() {
    return {
      loader: this.STYLE_LOADER,
      options: {
        sourceMap: true,
      },
    };
  }

  get cssExtractLoader() {
    return {
      loader: MiniCssExtractPluginLoader,
    };
  }

  get cssLoader() {
    return {
      loader: this.CSS_LOADER,
      options: {
        sourceMap: true,
        importLoaders: 1,
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

  get postCSSLoader() {
    const extraPostCSSPlugins = this.opts.extraPostCSSPlugins || [];
    return {
      loader: this.POSTCSS_LOADER,
      options: {
        sourceMap: true,
        postcssOptions: {
          plugins: [autoprefixer(), ...extraPostCSSPlugins].filter(Boolean),
        },
      },
    };
  }
}

export default Style;
