import webpack from 'webpack';
import { Options } from 'interfaces';
import { WebpackCreator } from './creator';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

class DevAction extends WebpackCreator {
  constructor(opts: Options) {
    super(opts);
  }

  public config() {
    const conf = {
      devtool: 'cheap-module-source-map',
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        this.opts && new BundleAnalyzerPlugin()
      ].filter(Boolean),
    }
    return this.mergeConfig(conf);
  }

  public action() {

  }
}

export default DevAction;