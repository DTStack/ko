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

  public initConfig(opts: Options): Configuration {
    this.baseConfig = getWebpackBaseConf(opts);
    return mergeWithCustomize({
      customizeArray: this.pluginsUnique(['HtmlWebpackPlugin']),
    })(this.baseConfig, config.userConf);
  }

  public mergeConfig(conf: Configuration): Configuration {
    return merge(this.baseConfig, conf);
  }

  private pluginsUnique(pluginNames: Array<string>) {
    return unique(
      'plugins',
      pluginNames,
      (plugin) => plugin.constructor && plugin.constructor.name
    );
  }

}

export default Creator;
