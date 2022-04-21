import webpack from 'webpack';
import { Options } from '../interfaces';
import { WebpackCreator } from './creator';

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

class Build extends WebpackCreator {
  constructor(opts: Options) {
    super(opts);
  }

  public config() {
    const conf = {
      optimization: {
        minimize: true,
        minimizer: ['...', CssMinimizerPlugin.parcelCssMinify],
      },
      plugins: [
        new webpack.optimize.SplitChunksPlugin({
          chunks: 'all',
          minSize: 30000,
          maxSize: 600000,
          minChunks: 1,
          automaticNameDelimiter: '_',
          cacheGroups: {
            baseCommon: {
              test: new RegExp(
                `[\\/]node_modules[\\/](${[
                  'react',
                  'react-router',
                  'react-dom',
                  'react-redux',
                  'redux',
                  'react-router-redux',
                ].join('|')})`
              ),
              priority: 1,
            },
            antd: {
              name: 'antd',
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              chunks: 'initial',
            },
            lodash: {
              name: 'lodash',
              test: /[\\/]node_modules[\\/]lodash[\\/]/,
              chunks: 'initial',
              priority: -10,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        }),
      ],
    };
    return this.mergeConfig([this.baseConfig, conf]);
  }

  public action() {
    //TODO: redefine stats
    webpack(this.config(), (error, stats: any) => {
      if (stats && stats.hasErrors()) {
        throw stats.toString({
          logging: 'warn',
          colors: true,
        });
      }
      if (error) {
        throw error;
      }
      this.successStdout('ko build completed!');
    });
  }
}

export default Build;
