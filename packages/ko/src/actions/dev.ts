import Webpack from 'webpack';
import WebpackDevServer, {
  Configuration as DevServerConfiguration,
} from 'webpack-dev-server';
import Service from '../core/service';
import WebpackConfig from '../webpack';
import ActionFactory from './factory';

class Dev extends ActionFactory {
  private webpackConfig: WebpackConfig;
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
      proxy,
      static: {
        watch: true,
        publicPath,
      },
    };
  }

  protected generateConfig() {
    const extraConfig = {
      devtool: 'cheap-module-source-map',
    };
    return this.webpackConfig.merge(extraConfig, {
      devServer: this.devServerConfig,
    });
  }

  public registerCommand(): void {
    const cmdName = 'dev';
    this.service.commander.registerCommand({
      name: cmdName,
      description: 'start devServer',
      options: [
        {
          flags: '--hash',
          description: 'output file name with hash',
          defaultValue: true,
        },
        {
          flags: '--analyzer',
          description: 'support building analyzer',
          defaultValue: false,
        },
      ],
    });
    this.webpackConfig = new WebpackConfig(this.service.config);
    this.service.commander.bindAction(cmdName, this.action.bind(this));
  }

  protected async action() {
    const config = this.generateConfig();
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
