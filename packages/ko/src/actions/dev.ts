import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import config from '../utils/config';
import { Options } from '../interfaces';
import { WebpackCreator } from './factory';

class Dev extends WebpackCreator {
  constructor(opts: Options) {
    super(opts);
  }

  public devSerConf() {
    const userDefinedDevServerConfig = config.userConf.devServer || {};
    const defaultDevServerConfig = {
      port: config.default.port,
      host: config.default.host,
      historyApiFallback: true,
      allowedHosts: 'all',
      hot: true,
      static: {
        directory: config.default.dist,
        publicPath: '/',
        watch: true,
      },
      open: true,
    };
    return { ...defaultDevServerConfig, ...userDefinedDevServerConfig };
  }

  public config() {
    const conf = {
      devtool: 'cheap-module-source-map',
      plugins: [new ReactRefreshPlugin()].filter(Boolean),
    };
    return this.mergeConfig([this.baseConfig, conf]);
  }

  public async action() {
    const config = this.config();
    const compiler = Webpack(config);
    const devServer = new WebpackDevServer(config.devServer, compiler);
    await devServer.start();
    process.stdin.on('end', () => {
      devServer.stop();
      process.exit(0);
    });
    process.stdin.resume();
  }
}

export default Dev;
