import Webpack from 'webpack';
import WebpackDevServer, {
  Configuration as DevServerConfiguration,
} from 'webpack-dev-server';
import Service from '../core/service';
import WebpackConfig from '../webpack';
import ActionFactory from './factory';
import { ICliOptions } from '../types';

class Dev extends ActionFactory {
  private webpackConfig: WebpackConfig;
  constructor(service: Service) {
    super(service);
  }

  private get devServerConfig(): DevServerConfiguration {
    const { serve, publicPath, logLevel } = this.service.config;
    const { host, port, proxy, staticPath, historyApiFallback = false } = serve;
    return {
      port,
      host,
      hot: true,
      proxy,
      static: {
        directory: staticPath,
        watch: true,
        publicPath,
      },
      setupExitSignals: false,
      allowedHosts: 'all',
      client: {
        overlay: false,
        logging: logLevel,
      },
      historyApiFallback,
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
    if (ret.plugins) {
      const plugins: any = await this.service.apply({
        key: this.service.hookKeySet.WEBPACK_PLUGIN,
        context: ret.plugins,
      });
      ret.plugins = plugins;
    }
    const { speedUp, disableLazyImports } =
      this.service.config?.experiment || {};
    ret.experiments = {
      lazyCompilation:
        speedUp && disableLazyImports
          ? {
              entries: false,
              imports: false,
            }
          : {
              entries: false,
              imports: true,
            },
    };
    await this.service.apply({
      key: this.service.hookKeySet.MODIFY_WEBPACK,
      context: ret,
    });
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
        },
        {
          flags: '--analyzer',
          description: 'support building analyzer',
        },
      ],
    });
    this.service.commander.bindAction(cmdName, this.action.bind(this));
  }

  protected async action(cliOpts: ICliOptions) {
    process.title = 'ko-dev';
    process.env.NODE_ENV = 'development';
    this.service.freezeCliOptsWith(cliOpts);
    const config = await this.generateConfig();
    const compiler = Webpack(config);
    const devServer = new WebpackDevServer(config.devServer, compiler);
    await devServer.start();
    const exitProcess = (callback?: () => void) => () => {
      callback && callback();
      process.exit(0);
    };
    process.stdin.on('end', () => {
      devServer.stopCallback(() => {
        exitProcess(() =>
          this.successStdout('webpack devServer process exit successfully')
        );
      });
      process.stdin.resume();
    });
    ['SIGINT', 'SIGTERM'].forEach(signal => {
      process.on(
        signal,
        exitProcess(() => {
          console.log('\n');
          this.warningStdout(
            'stop webpack devServer process via command signal:',
            signal
          );
        })
      );
    });
  }
}

export default Dev;
