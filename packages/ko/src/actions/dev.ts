import Webpack from 'webpack';
import WebpackDevServer, {
  Configuration as DevServerConfiguration,
} from 'webpack-dev-server';
import Service from '../core/service';
import WebpackConfig from '../webpack';
import ActionFactory from './factory';
import { ICliOptions } from '../types';
import detect from 'detect-port';
import inquirer from 'inquirer';

class Dev extends ActionFactory {
  private webpackConfig: WebpackConfig;
  constructor(service: Service) {
    super(service);
  }

  private get devServerConfig(): DevServerConfiguration {
    const { serve, publicPath } = this.service.config;
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
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: true,
        },
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

  private async changePort(newPort: number, port: number) {
    const question = {
      type: 'confirm',
      name: 'changePort',
      message: `port: ${port} has been used，use new port ${newPort} instead?`,
      default: true,
    };
    const answer = await inquirer.prompt([question]);
    if (answer.changePort) {
      return newPort;
    }
    this.errorStdout(`so sorry, ${port} already in use！！`);
    process.exit(0);
  }

  private async checkPort(port: number) {
    const newPort = await detect(port);
    if (newPort === port) {
      return newPort;
    }
    const isInteractive = process.stdout.isTTY;
    if (isInteractive) {
      return this.changePort(newPort, port);
    }
  }

  protected async action(cliOpts: ICliOptions) {
    process.title = 'ko-dev';
    process.env.NODE_ENV = 'development';
    this.service.freezeCliOptsWith(cliOpts);
    const config = await this.generateConfig();
    const port = config.devServer?.port as number;
    const newPort = (await this.checkPort(port)) as number;
    const compiler = Webpack(config);
    const devServer = new WebpackDevServer(
      { ...config.devServer, port: newPort },
      compiler
    );
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
