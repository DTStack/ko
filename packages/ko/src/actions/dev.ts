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
    const { host, port, proxy, staticPath } = serve;
    return {
      port,
      host,
      hot: true,
      historyApiFallback: true,
      proxy,
      static: {
        directory: staticPath,
        watch: true,
        publicPath,
      },
    };
  }

  protected async generateConfig() {
    this.webpackConfig = new WebpackConfig(this.service);
    const extraConfig = {
      devtool: 'cheap-module-source-map',
      mode: <const>'development',
    };
    const ret = this.webpackConfig.merge(extraConfig, {
      devServer: this.devServerConfig,
    });
    const plugins: any = await this.service.apply({
      key: this.service.hookKeySet.WEBPACK_PLUGIN,
      context: ret.plugins,
    });
    ret.plugins = plugins;
    return ret;
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
    this.service.commander.bindAction(cmdName, this.action.bind(this));
  }

  protected async action() {
    process.env.NODE_ENV = 'development';
    const config = await this.generateConfig();
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
