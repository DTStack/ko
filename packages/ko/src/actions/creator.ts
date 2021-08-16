import chalk from 'chalk';
import { mergeWithCustomize, unique, merge } from 'webpack-merge';
import getWebpackBaseConf from '../webpack';
import config from 'utils/config';
import { Configuration } from 'webpack';
import { Options } from 'interfaces';

abstract class Creator {
  protected abstract action(opts: Options): void;
}

export abstract class WebpackCreator extends Creator {
  baseConfig: Configuration;
  opts: Options;
  constructor(opts: Options) {
    super();
    this.opts = opts;
    this.baseConfig = this.initConfig(opts);
  }
  protected abstract config(opts: Options): any;

  private pluginsUnique(pluginNames: Array<string>) {
    return unique(
      'plugins',
      pluginNames,
      (plugin) => plugin.constructor && plugin.constructor.name
    );
  }

  public initConfig(opts: Options): Configuration {
    this.baseConfig = getWebpackBaseConf(opts);
    return mergeWithCustomize({
      customizeArray: this.pluginsUnique(['HtmlWebpackPlugin']),
    })(this.baseConfig, config.userConf);
  }

  public mergeConfig(conf: Configuration[]): Configuration {
    return merge(conf);
  }

  public successStdout(log: string) {
    console.log(chalk.green(log))
  }

  public linkStdout(link: string) {
    console.log(chalk.underline(link));
  }

  public errorStdout(log: string) {
    console.log(chalk.red(log))
  }
}

export default Creator;
