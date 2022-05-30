import webpack from 'webpack';
import Service from '../core/service';
import WebpackConfig from '../webpack';
import { ActionFactory } from './factory';

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

class Build extends ActionFactory {
  private webpackConfig: WebpackConfig;
  constructor(service: Service) {
    super(service);
    this.webpackConfig = new WebpackConfig(service.config);
  }

  protected generateConfig() {
    const extraConfig = {
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
    return this.webpackConfig.merge(extraConfig);
  }

  public registerCommand(): void {
    const cmdName = 'build';
    this.service.commander.registerCommand({
      name: cmdName,
      description: 'build project',
      options: [
        {
          flags: '--hash',
          description: 'output file name with hash',
          defaultValue: true,
        },
      ],
    });
    this.service.commander.bindAction(cmdName, this.action.bind(this));
  }

  protected action() {
    webpack(this.generateConfig(), (error, stats: any) => {
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
