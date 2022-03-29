import Webpack from 'webpack';
import WebpackDevServer, { Configuration } from 'webpack-dev-server';
import detect from 'detect-port';
import { prompt } from 'inquirer';
import config from '../utils/config';
import { Options } from '../interfaces';
import { WebpackCreator } from './creator';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

class Dev extends WebpackCreator {
  private devServerConf: Configuration;
  constructor(opts: Options) {
    super(opts);
    const { port, host } = this.opts;
    const userDefinedDevServerConfig = config.userConf.devServer || {};
    this.devServerConf = {
      port,
      host,
      historyApiFallback: true,
      allowedHosts: 'all',
      static: {
        publicPath: '/',
      },
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      setupExitSignals: true,
      ...userDefinedDevServerConfig,
    };
  }

  public config() {
    const conf = {
      devtool: 'cheap-module-source-map',
      plugins: [this.opts.analyzer && new BundleAnalyzerPlugin()].filter(
        Boolean
      ),
      devServer: this.devServerConf,
    };
    return this.mergeConfig([this.baseConfig, conf]);
  }

  private async changePort(newPort: number, port: number) {
    const question = {
      type: 'confirm',
      name: 'changePort',
      message: `port: ${port} has been used，use new port ${newPort} instead?`,
      default: true,
    };
    const answer = await prompt([question]);
    if (answer.changePort) {
      return newPort;
    } else {
      return null;
    }
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

  public async action() {
    const { port } = this.devServerConf;
    const newPort = await this.checkPort(parseInt(port as string));
    if (!newPort) {
      process.exit(0);
    }
    this.devServerConf.port = newPort;
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
