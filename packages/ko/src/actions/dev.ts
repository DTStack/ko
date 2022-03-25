import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import detect from 'detect-port';
import { prompt } from 'inquirer';
import config from '../utils/config';
import { Options } from '../interfaces';
import { WebpackCreator } from './creator';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

class Dev extends WebpackCreator {
  constructor(opts: Options) {
    super(opts);
  }

  public devSerConf() {
    const userDefinedDevServerConfig = config.userConf.devServer || {};
    const { port, host } = this.opts;
    const defaultDevServerConfig = {
      port,
      host,
      historyApiFallback: true,
      allowedHosts: 'all',
      hot: true,
      static: {
        directory: config.defaultPaths.dist,
        publicPath: '/',
        watch: true,
      },
      client: {
        overlay: false,
      },
      setupExitSignals: true,
    };
    return { ...defaultDevServerConfig, ...userDefinedDevServerConfig };
  }

  public config() {
    const conf = {
      devtool: 'cheap-module-source-map',
      plugins: [this.opts.analyzer && new BundleAnalyzerPlugin()].filter(
        Boolean
      ),
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
    const devSerConf = this.devSerConf();
    const { port } = devSerConf;
    const newPort = await this.checkPort(parseInt(port));
    if (!newPort) {
      process.exit(0);
    }
    devSerConf.port = newPort;
    const compiler = webpack(this.config());
    const devServer = new WebpackDevServer(devSerConf, compiler);
    await devServer.start();
    process.stdin.on('end', () => {
      devServer.stop();
      process.exit(0);
    });
  }
}

export default Dev;
