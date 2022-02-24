import webpack from 'webpack';
import { ESBuildMinifyPlugin } from 'esbuild-loader';
import { Options } from '../interfaces';
import { WebpackCreator } from './creator';

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

class Build extends WebpackCreator {
  constructor(opts: Options) {
    super(opts);
  }

  public config() {
    const { esbuild } = this.opts;
    const conf = {
      optimization: {
        minimizer: [
          !esbuild && new CssMinimizerPlugin(),
          esbuild &&
            new ESBuildMinifyPlugin({
              target: 'es2015',
              css: true,
            }),
        ].filter(Boolean),
      },
      plugins: [
        new webpack.optimize.SplitChunksPlugin({
          chunks: 'async',
          minSize: 30000,
          maxSize: 600000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '_',
          cacheGroups: {
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
