import Webpack from 'webpack';
import WebpackDevServer, {
  Configuration as DevServerConfiguration,
} from 'webpack-dev-server';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import Service from '../core/service';
import WebpackConfig from '../webpack';
import ActionFactory from './factory';

class Dev extends ActionFactory {
  constructor(service: Service) {
    super(service);
  }

  private get devServerConfig(): DevServerConfiguration {
    const { serve, publicPath } = this.service.config;
    const { host, port, proxy } = serve;
    return {
      port,
      host,
      hot: true,
      historyApiFallback: true,
      static: {
        watch: true,
        publicPath,
      },
    };
  }

  public generateConfig(opts: any) {
    const conf = {
      devtool: 'cheap-module-source-map',
      plugins: [new ReactRefreshPlugin()].filter(Boolean),
    };
    return this.mergeConfig([this.baseConfig, conf]);
  }

  public async bindAction() {
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
