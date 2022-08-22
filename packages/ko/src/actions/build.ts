import webpack, { Configuration } from 'webpack';
import Service from '../core/service';
import WebpackConfig from '../webpack';
import { ActionFactory } from './factory';

import { ESBuildMinifyPlugin } from 'esbuild-loader';
import { ICliOptions } from '../types';

class Build extends ActionFactory {
  private webpackConfig: WebpackConfig;
  constructor(service: Service) {
    super(service);
  }

  protected async generateConfig() {
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
          : ['...'],
      },
    } as Configuration;
    const ret = this.webpackConfig.merge(extraConfig);
    const plugins: any = await this.service.apply({
      key: this.service.hookKeySet.WEBPACK_PLUGIN,
      context: ret.plugins,
    });
    ret.plugins = plugins;
    return ret;
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
        },
      ],
    });
    this.service.commander.bindAction(cmdName, this.action.bind(this));
  }

  protected async action(cliOpts: ICliOptions) {
    process.title = 'ko-build';
    process.env.NODE_ENV = 'production';
    this.service.freezeCliOptsWith(cliOpts);
    const config = await this.generateConfig();
    webpack(config, (error, stats: any) => {
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
