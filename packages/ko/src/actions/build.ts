import webpack, { Configuration } from 'webpack';
import Service from '../core/service';
import WebpackConfig from '../webpack';
import { ActionFactory } from './factory';

import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { ESBuildMinifyPlugin } from 'esbuild-loader';

class Build extends ActionFactory {
  private webpackConfig: WebpackConfig;
  constructor(service: Service) {
    super(service);
  }

  protected generateConfig() {
    this.webpackConfig = new WebpackConfig(this.service);
    const extraConfig = {
      optimization: {
        minimize: true,
        minimizer: this.service.config.experiment?.minimizer
          ? [
              new ESBuildMinifyPlugin({
                target: 'es2015',
                css: true,
              }),
            ]
          : ['...', CssMinimizerPlugin.parcelCssMinify],
      },
    };
    return this.webpackConfig.merge(extraConfig as Configuration);
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
    process.env.NODE_ENV = 'production';
    webpack(this.generateConfig(), (error, stats: any) => {
      if (stats && stats.hasErrors()) {
        throw stats.toString({
          logging: 'error',
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
