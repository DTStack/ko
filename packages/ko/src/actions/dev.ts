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
      contentBase: config.defaultPaths.dist,
      historyApiFallback: true,
      disableHostCheck: true,
      compress: true,
      clientLogLevel: 'none',
      hot: true,
      inline: true,
      publicPath: '/',
      watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 600,
      },
      open: true
    };
    return { ...defaultDevServerConfig, ...userDefinedDevServerConfig };
  }

  public config() {
    const conf = {
      devtool: 'cheap-module-source-map',
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        this.opts && new BundleAnalyzerPlugin()
      ].filter(Boolean),
    }
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

  private getUrlHost(host: string): string {
    const regex = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*$/i;
    return regex.test(host) ? host : `http://${host}`;
  }

  public async action() {
    const { port, host } = this.devSerConf();
    const newPort = await this.checkPort(parseInt(port));
    if (!newPort) return;
    WebpackDevServer.addDevServerEntrypoints(
      this.config(), this.devSerConf()
    )
    const compiler = webpack(this.config());
    const devServer = new WebpackDevServer(compiler, this.devSerConf());
    let isFirstCompile = true;

    compiler.hooks.done.tap('done', (stats) => {
      if (isFirstCompile) {
        isFirstCompile = false;
        this.successStdout('development server has been started');
        console.log(`server starts at: ${this.linkStdout(this.getUrlHost(host) + ':' + port)}`);
      }
      if (stats.hasErrors()) {
        console.log(stats.toString({
          colors: true
        }))
      }
    });

    compiler.hooks.invalid.tap('invalid', () => {
      console.log('Compiling...');
    });

    devServer.listen(port, host, (err) => {
      if (err) {
        console.error(err);
        process.exit(500);
      }
    });
  }
}

export default Dev;